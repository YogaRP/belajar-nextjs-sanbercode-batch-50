export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      try {
        const { notes_id } = req.query;
        const response = await fetch(
          `https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${notes_id}`
        );
        res.status(200).json({ message: "Sukses" });
      } catch (error) {
        console.log(error);
      }
      break;
    case "PATCH":
      try {
        const { id } = req.query;
        const response = await (
          await fetch(
            `https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${id}`
          )
        ).json();
        res.status(200).json({ ...response });
      } catch (err) {
        console.log(err);
      }
      break;
    case "GET":
      try {
        const { notes_id } = req.method;
        console.log(notes_id);
        const response = await (
          await fetch(
            `https://paace-f178cafcae7b.nevacloud.io/api/notes/${notes_id}`
          )
        ).json();
        res.status(200).json({ ...response });
      } catch (err) {
        console.log(err);
      }
      break;
    default:
      console.log("Method tidak ditemukan");
      break;
  }
}
