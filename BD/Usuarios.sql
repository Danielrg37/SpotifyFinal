CREATE TABLE Usuarios (
    idUsuario INT PRIMARY KEY IDENTITY(1,1),
    nombreUsuario VARCHAR(100) NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT GETDATE()
);