CREATE TABLE Usuarios (
    UsuarioID INT PRIMARY KEY IDENTITY(1, 1),
    Nombre VARCHAR(100),
    Contraseña VARCHAR(100),
    Correo VARCHAR(255),
    FechaCreacion DATETIME
);
