import { useState } from "react";
import usePosts from "../hooks/usePosts";

function GestorPosts() {
  const {
    posts,
    cargando,
    error,
    agregarPost,
    eliminarPost
  } = usePosts();

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  async function manejarEnvio(evento) {
    evento.preventDefault();

    if (titulo.trim() === "" || contenido.trim() === "") {
      alert("Debe completar el título y el contenido.");
      return;
    }

    await agregarPost(titulo, contenido);

    setTitulo("");
    setContenido("");
  }

  if (cargando) {
    return (
      <section className="card">
        <p>Cargando publicaciones...</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Gestor de publicaciones</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={manejarEnvio} className="formulario">
        <label htmlFor="titulo">Título:</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ingrese el título"
        />

        <label htmlFor="contenido">Contenido:</label>
        <textarea
          id="contenido"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Ingrese el contenido"
          rows="4"
        />

        <button type="submit">Crear publicación</button>
      </form>

      <hr />

      <h3>Publicaciones registradas</h3>

      {posts.length === 0 ? (
        <p>No existen publicaciones.</p>
      ) : (
        <div className="lista-posts">
          {posts.map((post) => (
            <article className="post" key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>

              <button
                className="btn-eliminar"
                onClick={() => eliminarPost(post.id)}
              >
                Eliminar
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default GestorPosts;
