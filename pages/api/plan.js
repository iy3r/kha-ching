import axios from 'axios';

const { DATABASE_HOST_URL, DATABASE_USER_KEY, DATABASE_API_KEY } = process.env;

export default async function plan(req, res) {
  const { dayOfWeek, config } = req.body;

  const baseUrl = `${DATABASE_HOST_URL}/set_${DATABASE_USER_KEY}`;
  console.log({ baseUrl });
  if (req.method === 'POST') {
    const { data } = await axios[req.method.toLowerCase()](`${baseUrl}/${dayOfWeek}`, config, {
      headers: {
        'x-api-key': DATABASE_API_KEY
      }
    });
    return res.json(data);
  }

  if (req.method === 'PUT') {
    const { data } = await axios[req.method.toLowerCase()](`${baseUrl}/${config._id}`, config, {
      headers: {
        'x-api-key': DATABASE_API_KEY
      }
    });
    return res.json(data);
  }

  if (req.method === 'DELETE') {
    const { data } = await axios[req.method.toLowerCase()](`${baseUrl}/${config._id}`, {
      headers: {
        'x-api-key': DATABASE_API_KEY
      }
    });
    return res.json(data);
  }

  const { data: settings } = await axios(`${baseUrl}`);
  return res.json(settings);
}
