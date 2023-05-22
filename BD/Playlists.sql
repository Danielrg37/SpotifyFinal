CREATE TABLE Playlists (
    idUsuario INT PRIMARY KEY IDENTITY(1,1),
    nombrePlaylist VARCHAR(100) NOT NULL,
	   createdAt DATETIME NOT NULL DEFAULT GETDATE()
)
