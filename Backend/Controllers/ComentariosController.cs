using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ComentariosController : ControllerBase
    {
        private readonly string conexion;

        public ComentariosController()
        {
            // Cadena de conexión
            conexion = "Data Source=EC2AMAZ-HD3BM03\\MSSQLSERVER01;Initial Catalog=Spotify;User ID=EC2AMAZ-HD3BM03\\Administrator;Integrated Security=True";
        }

        private SqlConnection ObtenerConexion()
        {
            return new SqlConnection(conexion);
        }

        [HttpGet]
        [HttpGet("verificar_conexion")]
        public IActionResult VerificarConexion()
        {
            using (SqlConnection conexion2 = ObtenerConexion())
            {
                try
                {
                    // Abrir la conexión
                    conexion2.Open();

                    // La conexión se ha establecido correctamente
                    return Ok("Conexión establecida correctamente");
                }
                catch (Exception ex)
                {
                    // Error al conectar a la base de datos
                    return BadRequest("Error al conectar a la base de datos: " + ex.Message);
                }
            }
        }

        [HttpGet("comentarios")]
        public IActionResult ObtenerComentarios()
        {
            using (SqlConnection conexion3 = ObtenerConexion())
            {
                try
                {
                    // Abrir la conexión
                    conexion3.Open();

                    // Consulta SQL para obtener los comentarios
                    string sql = "SELECT * FROM Comentarios";

                    // Crear el comando SQL
                    SqlCommand comando = new SqlCommand(sql, conexion3);

                    // Ejecutar el comando y obtener los datos
                    SqlDataReader datos = comando.ExecuteReader();

                    // Lista para almacenar los comentarios
                    List<Comentario> comentarios = new List<Comentario>();

                    // Verificar si hay datos para leer
                    while (datos.Read())
                    {
                        // Crear un objeto para almacenar los datos
                        Comentario comentario = new Comentario();

                        // Obtener los datos de la fila actual
                        comentario.IDPagina = Convert.ToString(datos["IDPagina"]);
                        comentario.UsuarioID = Convert.ToInt32(datos["UsuarioID"]);
                      comentario.FechaCreacion = ((DateTime)datos["FechaCreacion"]).ToString("dd/MM/yyyy HH:mm:ss");
                        comentario.Texto = Convert.ToString(datos["Texto"]);
                        comentario.NombreUsuario = Convert.ToString(datos["NombreUsuario"]);

                        // Agregar el comentario a la lista
                        comentarios.Add(comentario);
                    }

                    // Cerrar la conexión
                    conexion3.Close();

                    // Retornar la lista de comentarios
                    return Ok(comentarios);
                }
                catch (Exception ex)
                {
                    // Error al obtener los comentarios
                    return BadRequest("Error al obtener los comentarios: " + ex.Message);
                }
            }
        }

        [HttpPost("crearComentarios")]
        public IActionResult CrearComentarios([FromBody] Comentario comentario)
        {
            using (SqlConnection conexion4 = ObtenerConexion())
            {
                try
                {
                    // Abrir la conexión
                    conexion4.Open();

                    // Consulta SQL para insertar un comentario
                    string sql = "INSERT INTO Comentarios (IDPagina, UsuarioID, FechaCreacion, Texto, NombreUsuario) VALUES (@IDPagina, @UsuarioID, @FechaCreacion, @Texto, @NombreUsuario)";

                    // Crear el comando SQL
                    SqlCommand comando = new SqlCommand(sql, conexion4);

                    // Asignar valor a los parámetros
                    comando.Parameters.AddWithValue("@IDPagina", comentario.IDPagina);
                    comando.Parameters.AddWithValue("@UsuarioID", comentario.UsuarioID);
                    comando.Parameters.AddWithValue("@FechaCreacion", comentario.FechaCreacion);
                    comando.Parameters.AddWithValue("@Texto", comentario.Texto);
                    comando.Parameters.AddWithValue("@NombreUsuario", comentario.NombreUsuario);

                    // Ejecutar el comando
                    comando.ExecuteNonQuery();

                    // Cerrar la conexión
                    conexion4.Close();

                    // Retornar un mensaje de éxito
                    return Ok("Comentario creado correctamente");
                }
                catch (Exception ex)
                {
                    // Error al crear el comentario
                    return BadRequest("Error al crear el comentario: " + ex.Message);
                }
            }
        }

    }
}

public class Comentario
{
    public string IDPagina { get; set; }
    public int UsuarioID { get; set; }

    public String FechaCreacion { get; set; }
    public string Texto { get; set; }

    public string NombreUsuario { get; set; }
}
