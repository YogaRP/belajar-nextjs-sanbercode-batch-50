export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Hanya untuk Post" });
  }
  try {
    const response = await (
      await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes")
    ).json();
    console.log(response);
    res.status(200).json({ ...response });
  } catch (error) {
    console.log(error);
  }
}
