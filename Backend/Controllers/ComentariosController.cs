/* using Microsoft.AspNetCore.Mvc;
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
    
    
        [HttpGet("usuarios")]
        public IActionResult ObtenerUsuarios()
        {
            using (SqlConnection conexion3 = ObtenerConexion())
            {
                try
                {
                    // Abrir la conexión
                    conexion3.Open();   

                    // Crear el comando SQL
                    string sqlQuery = "SELECT id, nombreUsuario, email FROM Usuarios";
                    SqlCommand comando = new SqlCommand(sqlQuery, conexion3);

                    // Ejecutar la consulta y obtener los resultados
                    List<Usuario> usuarios = new List<Usuario>();
                    using (SqlDataReader lector = comando.ExecuteReader())
                    {
                        while (lector.Read())
                        {
                            Usuario usuario = new Usuario
                            {
                                Id = Convert.ToInt32(lector["id"]),
                                NombreUsuario = lector["nombreUsuario"].ToString(),
                                Email = lector["email"].ToString()
                            };
                            usuarios.Add(usuario);
                        }
                    }

                    // Retornar los usuarios como resultado
                    return Ok(usuarios);
                }
                catch (Exception ex)
                {
                    // Error al consultar la base de datos
                    return BadRequest("Error al consultar la base de datos: " + ex.Message);
                }
            }
        }

        [HttpPost("usuarios/borrar")]
        public IActionResult BorrarUsuario([FromBody] BorrarUsuarioRequest request)
        {
            using (SqlConnection conexion4 = ObtenerConexion())
            {
                try
                {
                    // Abrir la conexión
                    conexion4.Open();

                    // Crear el comando SQL para borrar el usuario
                    string sqlQuery = "DELETE FROM Usuarios WHERE id = @Id";
                    SqlCommand comando2 = new SqlCommand(sqlQuery, conexion4);
                    comando2.Parameters.AddWithValue("@Id", request.Id);

                    // Ejecutar el comando
                    int rowsAffected = comando2.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        // El usuario se borró exitosamente
                        return Ok("Usuario borrado exitosamente");
                    }
                    else
                    {
                        // No se encontró el usuario o no se pudo borrar
                        return NotFound("No se encontró el usuario o no se pudo borrar");
                    }
                }
                catch (Exception ex)
                {
                    // Error al borrar el usuario
                    return BadRequest("Error al borrar el usuario: " + ex.Message);
                }
            }
        }

        [HttpPost("usuarios/editar")]
        public IActionResult EditarUsuario([FromBody] EditarUsuarioRequest request)
        {
            using (SqlConnection conexion5 = ObtenerConexion())
            {
                try
                {
                    // Abrir la conexión
                    conexion5.Open();

                    // Crear el comando SQL para editar el usuario
                    string sqlQuery = "UPDATE Usuarios SET nombreUsuario = @NombreUsuario, email = @Email WHERE id = @Id";
                    SqlCommand comando3 = new SqlCommand(sqlQuery, conexion5);
                    comando3.Parameters.AddWithValue("@Id", request.Id);
                    comando3.Parameters.AddWithValue("@NombreUsuario", request.NombreUsuario);
                    comando3.Parameters.AddWithValue("@Email", request.Email);

                    // Ejecutar el comando
                    int rowsAffected = comando3.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        // El usuario se editó exitosamente
                        return Ok("Usuario editado exitosamente");
                    }
                    else
                    {
                        // No se encontró el usuario o no se pudo editar
                        return NotFound("No se encontró el usuario o no se pudo editar");
                    }
                }
                catch (Exception ex)
                {
                    // Error al editar el usuario
                    return BadRequest("Error al editar el usuario: " + ex.Message);
                }
            }
        }
    }
     

    public class Usuario
    {
        public int Id { get; set; }
        public string NombreUsuario { get; set; }
        public string Email { get; set; }
    }

    public class BorrarUsuarioRequest
    {
        public int Id { get; set; }
    }

    public class EditarUsuarioRequest
    {
        public int Id { get; set; }
        public string NombreUsuario { get; set; }
        public string Email { get; set; }
    }
}
  */