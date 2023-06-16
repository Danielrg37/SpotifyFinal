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

                    // Consulta SQL para obtener los usuarios
                    string sql = "SELECT * FROM Comentarios";

                    // Crear el comando SQL
                    SqlCommand comando = new SqlCommand(sql, conexion3);

                    // Ejecutar el comando y obtener los datos
                    SqlDataReader datos = comando.ExecuteReader();

                    // Lista para almacenar los usuarios
                    List<Comentario> comentarios = new List<Comentario>();

                    // Verificar si hay datos para leer
                    while (datos.Read())
                    {
                        // Crear un objeto para almacenar los datos
                        Comentario comentario = new Comentario();

                        // Obtener los datos de la fila actual
                        comentario.Id = Convert.ToInt32(datos["id"]);
                        comentario.IdUsuario = Convert.ToInt32(datos["id_usuario"]);
                        comentario.IdCancion = Convert.ToInt32(datos["id_cancion"]);
                        comentario.Texto = datos["texto"].ToString();
                        comentario.Fecha = Convert.ToDateTime(datos["fecha"]);

                        // Agregar el usuario a la lista
                        comentarios.Add(comentario);
                    }

                    // Cerrar la conexión
                    conexion3.Close();

                    // Retornar la lista de usuarios
                    return Ok(comentarios);
                }
                catch (Exception ex)
                {
                    // Error al obtener los usuarios
                    return BadRequest("Error al obtener los usuarios: " + ex.Message);
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

                    // Consulta SQL para insertar un usuario
                    string sql = "INSERT INTO Comentarios (id_usuario, id_cancion, texto, fecha) VALUES (@id_usuario, @id_cancion, @texto, @fecha)";

                    // Crear el comando SQL
                    SqlCommand comando = new SqlCommand(sql, conexion4);

                    // Asignar valor a los parámetros
                    comando.Parameters.AddWithValue("@id_usuario", comentario.IdUsuario);
                    comando.Parameters.AddWithValue("@id_cancion", comentario.IdCancion);
                    comando.Parameters.AddWithValue("@texto", comentario.Texto);
                    comando.Parameters.AddWithValue("@fecha", comentario.Fecha);

                    // Ejecutar el comando
                    comando.ExecuteNonQuery();

                    // Cerrar la conexión
                    conexion4.Close();

                    // Retornar un mensaje de éxito
                    return Ok("Comentario creado correctamente");
                }
                catch (Exception ex)
                {
                    // Error al crear el usuario
                    return BadRequest("Error al crear el usuario: " + ex.Message);
                }
            }
        }

    }

}

public class Comentario
{
    public int Id { get; set; }
    public int IdUsuario { get; set; }
    public int IdCancion { get; set; }
    public string Texto { get; set; }
    public DateTime Fecha { get; set; }
}