using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccionesController : ControllerBase
    {
        private readonly string conexion;

        public AccionesController()
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

        [HttpGet("acciones")]

        public IActionResult ObtenerAcciones()
        {
            using (SqlConnection conexion3 = ObtenerConexion())
            {
                try
                {
                    // Abrir la conexión
                    conexion3.Open();

                    // Consulta SQL para obtener los usuarios
                    string sql = "SELECT * FROM Acciones";

                    // Ejecutar la consulta
                    using (SqlCommand comando = new SqlCommand(sql, conexion3))
                    {
                        
                        using (SqlDataReader reader = comando.ExecuteReader())
                        {
                        
                            List<Acciones> acciones = new List<Acciones>();

                        
                            while (reader.Read())
                            {
                               
                                acciones.Add(new Acciones()
                                {
                                    CancionID = reader["CancionID"].ToString(),
                                    ArtistaID = reader["ArtistaID"].ToString(),
                                    DiscoID = reader["DiscoID"].ToString(),
                                    UsuarioID = reader["UsuarioID"].ToString(),
                                    NombreUsuario = reader["NombreUsuario"].ToString(),
                                });
                            }

                       
                            return Ok(acciones);
                        }
                    }
                }
                catch (Exception ex)
                {
                    
                    return BadRequest("Error al obtener las acciones: " + ex.Message);
                }
            }
        }

   [HttpPost("acciones_anadir")]
public IActionResult AñadirAcciones(Acciones acciones)
        {
            using (SqlConnection conexion4 = ObtenerConexion())
            {
                try
                {
                    // Abrir la conexión
                    conexion4.Open();

                    // Consulta SQL para insertar un usuario
                    string sql = "INSERT INTO Acciones (CancionID, ArtistaID, DiscoID, UsuarioID, NombreUsuario) VALUES (@CancionID, @ArtistaID, @DiscoID, @UsuarioID, @NombreUsuario)";

                    // Ejecutar la consulta
                    using (SqlCommand comando = new SqlCommand(sql, conexion4))
                    {
                        comando.Parameters.Add("@CancionID", SqlDbType.VarChar, 50).Value = acciones.CancionID;
                        comando.Parameters.Add("@ArtistaID", SqlDbType.VarChar, 50).Value = acciones.ArtistaID;
                        comando.Parameters.Add("@DiscoID", SqlDbType.VarChar, 50).Value = acciones.DiscoID;
                        comando.Parameters.Add("@UsuarioID", SqlDbType.VarChar, 50).Value = acciones.UsuarioID;
                        comando.Parameters.Add("@NombreUsuario", SqlDbType.VarChar, 50).Value = acciones.NombreUsuario;

                        // Obtener el ID generado
                        acciones.CancionID = comando.ExecuteScalar().ToString();

                        // La acción se ha insertado correctamente
                        return Ok("Acción insertada correctamente");
                    }
                }
                catch (Exception ex)
                {
                    // Error al insertar la acción
                    return BadRequest("Error al insertar la acción: " + ex.Message);
                }
            }
        }

        public class Acciones 
        {
         public string CancionID { get; set; }

          public string ArtistaID { get; set; }
            public string DiscoID { get; set; }

            public string UsuarioID { get; set; }

            public string NombreUsuario { get; set; }

           

            
        }
    }
}

    
    
        