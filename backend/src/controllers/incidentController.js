const connection = require('../database/connection');

const PAGE_SIZE = 5;

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .select('*')
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ngo_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ngo_id
    })

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ngo_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ngo_id')
      .first();

    if (incident === undefined || incident.ngo_id !== ngo_id) {
      return response.status(401).json({ error: 'Operation not permitted.'});
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  }
}
