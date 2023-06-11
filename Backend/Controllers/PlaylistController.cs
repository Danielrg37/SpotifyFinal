using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Backend.Controllers
{
    [ApiController]
    [Route("playlist")]
    public class PlaylistController : ControllerBase
    {
        private readonly string conexion;

        public PlaylistController()
        {
            // Cadena de conexión
            conexion = "Data Source=EC2AMAZ-HD3BM03\\MSSQLSERVER01;Initial Catalog=Spotify;User ID=EC2AMAZ-HD3BM03\\Administrator;Integrated Security=True";
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
                    string sqlQuery = "SELECT idUsuario, nombrePlaylist, createdAt, idPlaylist FROM Playlists";
                    SqlCommand comando = new SqlCommand(sqlQuery, conexion3);

                    // Ejecutar la consulta y obtener los resultados
                    SqlDataReader reader = comando.ExecuteReader();
                    List<Playlist> listaPlaylist = new List<Playlist>();

                    while (reader.Read())
                    {
                        Playlist playlist = new Playlist();
                        playlist.IdUsuario = reader.GetInt32(0);
                        playlist.Nombre = reader.GetString(1);
                        playlist.createdAt = reader.GetDateTime(2);
                        playlist.IdPlaylist = reader.GetString(3);
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
        





public class Playlist
{
    public int IdUsuario { get; set; }
    public string Nombre { get; set; }
 
    public DateTime createdAt { get; set; }

    public string IdPlaylist { get; set; }

}

    }
}