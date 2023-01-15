const { server, publications } = require("../src/server");
const request = require("supertest");
const api = request(server);

describe("01 | Ejercicios", () => {
  let id = 0;

  it("1 | POST a la ruta /posts agrega nueva publicación o un error si faltan datos", async () => {
    const newPost = {
      id: ++id,
      author: "Author Test",
      title: "Title Test",
      contents: "Content Test",
    };
    const response = await api.post("/posts").send(newPost);
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
    expect(publications).toContainEqual(newPost);
    const response2 = await api.post("/posts").send({});
    expect(response2.status).toBeGreaterThanOrEqual(400);
    expect(response2.status).toBeLessThan(500);
    expect(publications).not.toContainEqual({});
    const newPost2 = {
      id: ++id,
      author: "Author Test 2",
      title: "Title Test 2",
      contents: "Content Test 2",
    };
    const response3 = await api.post("/posts").send(newPost2);
    expect(response3.status).toBeGreaterThanOrEqual(200);
    expect(response3.status).toBeLessThan(300);
    expect(publications).toContainEqual(newPost, newPost2);
  });

  it("2A | GET a la ruta /posts, si existe la query 'term' devuelve los posts que coincidan con ese query. En caso de que no exista, devuelve todos los posts", async () => {
    const response = await api.get("/posts");
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
    expect(response.body).toEqual(publications);
    const addingPost = await api.post("/posts").send({
      id: ++id,
      author: "Author Test 3",
      title: "Title Test 3",
      contents: "Content Testing 3",
    });
    expect(addingPost.status).toBeGreaterThanOrEqual(200);
    expect(addingPost.status).toBeLessThan(300);
    const response2 = await api.get("/posts");
    expect(response2.status).toBeGreaterThanOrEqual(200);
    expect(response2.status).toBeLessThan(300);
    expect(response2.body).toEqual(publications);
    const response3 = await api.get("/posts").query({ term: "Testing" });
    expect(response3.status).toBeGreaterThanOrEqual(200);
    expect(response3.status).toBeLessThan(300);
    const termQuery = response3.req.path.split("?")[1].split("=")[1];
    const filteredPosts = publications.filter(
      (post) =>
        post.title.includes(termQuery) || post.contents.includes(termQuery)
    );
    filteredPosts.length > 0
      ? expect(response3.body).toEqual(filteredPosts)
      : expect(response3.body).toEqual(publications);
    const response4 = await api.get("/posts").query({ term: "Not Found" });
    expect(response4.status).toBeGreaterThanOrEqual(200);
    expect(response4.status).toBeLessThan(300);
    const termQuery2 = response4.req.path.split("?")[1].split("=")[1];
    const filteredPosts2 = publications.filter(
      (post) =>
        post.title.includes(termQuery2) || post.contents.includes(termQuery2)
    );
    filteredPosts2.length > 0
      ? expect(response4.body).toEqual(filteredPosts2)
      : expect(response4.body).toEqual(publications);
  });

  it("2B | GET a la ruta /posts, si existen las querys 'author' y 'title', devuelve los posts que coincidan con ambas querys. En caso de que no exista, devuelve un error", async () => {
    const response = await api
      .get("/posts")
      .query({ author: "Author Test", title: "Title Tesasdt" });
    if (response.body.length > 0) {
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(300);
      const authorQuery = response.req.path
        .split("?")[1]
        .split("&")[0]
        .split("=")[1]
        .replace("%20", " ");
      const titleQuery = response.req.path
        .split("?")[1]
        .split("&")[1]
        .split("=")[1]
        .replace("%20", " ");
      const filteredPosts = publications.filter(
        (post) => post.author === authorQuery && post.title === titleQuery
      );
      expect(response.body).toEqual(filteredPosts);
    } else {
      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.status).toBeLessThan(500);
      expect(response.body).toEqual({
        error:
          "No existe ninguna publicación con dicho título y autor indicado",
      });
    }
  });

  it("3 | GET a la ruta /posts/:author devuelve un array de posts del autor. En caso de que el autor no tenga posts, devuelve un error", async () => {
    //al request le paso el params author
    const author = "Author Test 3";
    const filteredPosts = publications.filter((post) => post.author === author);
    const response = await api.get(`/posts/${author}`);
    if (filteredPosts.length > 0) {
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(300);
      expect(response.body).toEqual(filteredPosts);
    } else {
      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.status).toBeLessThan(500);
      expect(response.body).toEqual({
        error: "No existe ningun post del autor indicado",
      });
    }
    const author2 = "Not Found";
    const filteredPosts2 = publications.filter(
      (post) => post.author === author2
    );
    const response2 = await api.get(`/posts/${author2}`);
    if (filteredPosts2.length > 0) {
      expect(response2.status).toBeGreaterThanOrEqual(200);
      expect(response2.status).toBeLessThan(300);
      expect(response2.body).toEqual(filteredPosts2);
    } else {
      expect(response2.status).toBeGreaterThanOrEqual(400);
      expect(response2.status).toBeLessThan(500);
      expect(response2.body).toEqual({
        error: "No existe ningun post del autor indicado",
      });
    }
  });

  it("4 | PUT a la ruta /posts/:id, actualiza el post con el id indicado. En caso de que no exista, devuelve un error", async () => {
    let id = Math.floor(Math.random() * 10) + 1;
    const post = publications.find((post) => post.id === id);
    if (post) {
      const response = await api.put(`/posts/${id}`).send({
        title: "Title Test 4",
        contents: "Contents Test 4",
      });
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(300);
      expect(response.body).toEqual({
        id: id,
        author: post.author,
        title: "Title Test 4",
        contents: "Contents Test 4",
      });
    } else {
      //si no existe el post, devuelvo error
      const response = await api.put(`/posts/${id}`).send({
        title: "Title Test 4",
        contents: "Contents Test 4",
      });
      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.status).toBeLessThan(500);
      expect(response.body).toEqual({
        error:
          "No se recibió el id correcto necesario para modificar la publicación",
      });
    }
  });

  it("5 | DELETE a la ruta /posts/:id, elimina el post con el id indicado. En caso de que no exista, devuelve un error", async () => {
    let id = Math.floor(Math.random() * 10) + 1;
    const post = publications.find((post) => post.id === id);
    if (post) {
      const response = await api.delete(`/posts/${id}`);
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(300);
      expect(response.body).toEqual({ success: true });
    } else {
      const response = await api.delete(`/posts/${id}`);
      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.status).toBeLessThan(500);
      expect(response.body).toEqual({
        error:
          "No se recibió el id correcto necesario para eliminar la publicación",
      });
    }
  });

  it("6 | DELETE a la ruta /author/:name, elimina todos los posts del autor indicado. En caso de que no exista, devuelve un error", async () => {
    const author = "Author Test 3";
    const filteredPosts = publications.filter((post) => post.author === author);
    if (filteredPosts.length > 0) {
      const response = await api.delete(`/author/${author}`);
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(300);
      expect(response.body).toEqual(filteredPosts);
    } else {
      const response = await api.delete(`/author/${author}`);
      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.status).toBeLessThan(500);
      expect(response.body).toEqual({
        error:
          "No se recibió el nombre correcto necesario para eliminar las publicaciones del autor",
      });
    }
  });
});
