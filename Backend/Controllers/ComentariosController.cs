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
                        comentario.PaginaID = Convert.ToInt32(datos["PaginaID"]);
                        comentario.UsuarioID = Convert.ToInt32(datos["UsuarioID"]);
                        comentario.FechaCreacion = Convert.ToDateTime(datos["fechaCreacion"]);
                        comentario.Texto = Convert.ToString(datos["Texto"]);

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

            // Consulta SQL para insertar un comentario
            string sql = "INSERT INTO Comentarios (PaginaID, UsuarioID, Texto) VALUES (@PaginaID, @UsuarioID, @Texto)";

            // Crear el comando SQL
            SqlCommand comando = new SqlCommand(sql, conexion4);

          
            // Asignar valor a los parámetros
            comando.Parameters.AddWithValue("@PaginaID", comentario.PaginaID);
            comando.Parameters.AddWithValue("@UsuarioID", comentario.UsuarioID);
         
            comando.Parameters.AddWithValue("@Texto", comentario.Texto);

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
    public int PaginaID { get; set; }
    public int UsuarioID { get; set; }
    public DateTime FechaCreacion { get; set; }

    public string Texto { get; set; }
}