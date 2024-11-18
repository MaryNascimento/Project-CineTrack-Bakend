export class ListService {
  constructor({ listRepository }) {
    this.listRepository = listRepository;
  }

  async createList(list) {
    return await this.listRepository.create(list);
  }

  async addMovie(listId, movie) {
    if (!movie) {
      throw new Error("Movie name is required.");
    }

    const list = await this.listRepository.findById(listId);
    if (!list) {
      throw new Error("List not found.");
    }

    return await this.listRepository.addMovieToList(listId, movie);
  }

  async getListsByUserId(userId) {
    return await this.listRepository.findByUserId(userId);
  }

  async getListById(id) {
    return await this.listRepository.findById(id);
  }

  async getAllLists() {
    return await this.listRepository.findAll();
  }

  async updateList(id, list) {
    return await this.listRepository.update(id, list);
  }

  async deleteList(id) {
    return await this.listRepository.delete(id);
  }
}
