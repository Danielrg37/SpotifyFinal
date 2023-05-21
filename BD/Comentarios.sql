CREATE TABLE Comentarios (
    ComentarioID INT PRIMARY KEY IDENTITY(1, 1),
    CancionTitulo VARCHAR(100),
    ComentarioTexto VARCHAR(255),
    FechaCreacion DATETIME
);
