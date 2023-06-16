using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlaylistController : ControllerBase
    {
        private readonly string conexion;

        public PlaylistController()
        {
            // Cadena de conexión
            conexion = "Data Source=EC2AMAZ-HD3BM03\\MSSQLSERVER01;Initial Catalog=Spotify;User ID=Administrator;Integrated Security=True";

        }

        private SqlConnection ObtenerConexion()
        {
            return new SqlConnection(conexion);
        }

        [HttpGet]
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

        [HttpGet("playlists")]
        public IActionResult ObtenerPlaylist()
        {
            using (SqlConnection conexion3 = ObtenerConexion())
            {
                try
                {
                    // Abrir la conexión
                    conexion3.Open();

                    // Crear el comando SQL
                    string sqlQuery = "SELECT idUsuario, nombrePlaylist, createdAt, idPlaylist FROM Playlist";
                    SqlCommand comando = new SqlCommand(sqlQuery, conexion3);

                    // Ejecutar la consulta y obtener los resultados
                    SqlDataReader reader = comando.ExecuteReader();
                    List<Playlist> listaPlaylist = new List<Playlist>();

                    while (reader.Read())
                    {
                        Playlist playlist = new Playlist();
                        playlist.idUsuario = reader.GetInt32(0);
                        playlist.Nombre = reader.GetString(1);
                        playlist.createdAt = reader.GetDateTime(2);
                        playlist.idPlaylist = reader.GetString(3);
                        listaPlaylist.Add(playlist);
                    }

                    // Cerrar el lector de resultados
                    reader.Close();

                    // Retornar la lista de usuarios
                    return Ok(listaPlaylist);
                }
                catch (Exception ex)
                {
                    // Error al obtener los usuarios
                    return BadRequest("Error al obtener las playlist " + ex.Message);
                }
            }
        }

        [HttpPost("crearPlaylist")]

        public IActionResult CrearPlaylist([FromBody] Playlist playlist)
        {
            using (SqlConnection conexion4 = ObtenerConexion())
            {
                try
                {
                    // Abrir la conexión
                    conexion4.Open();

                    // Crear el comando SQL
                   string sqlQuery = "INSERT INTO Playlist (idUsuario, nombrePlaylist, createdAt, idPlaylist) VALUES (@idUsuario, @nombrePlaylist, @createdAt, @idPlaylist)";
SqlCommand comando = new SqlCommand(sqlQuery, conexion4);

DateTime currentDateTime = DateTime.UtcNow;



// Asignar parámetros in the correct order
comando.Parameters.AddWithValue("@idUsuario", playlist.idUsuario);
comando.Parameters.AddWithValue("@nombrePlaylist", playlist.Nombre);
comando.Parameters.AddWithValue("@createdAt", currentDateTime);
comando.Parameters.AddWithValue("@idPlaylist", playlist.idPlaylist);



                    // Ejecutar el comando
                    comando.ExecuteNonQuery();

                    // Retornar un mensaje de éxito
                    return Ok("Playlist creada correctamente");
                }
                catch (Exception ex)
                {
                    // Error al crear el usuario
                    return BadRequest("Error al crear la playlist: " + ex.Message);
                }
            }
        }





        public class Playlist
        {
            public int idUsuario { get; set; }
            public string Nombre { get; set; }

            public DateTime createdAt { get; set; }

            public string idPlaylist { get; set; }

        }

    }
}