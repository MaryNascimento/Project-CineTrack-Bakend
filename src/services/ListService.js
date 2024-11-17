export class ListService {
    constructor({ ListRepository }) {
      this.ListRepository = ListRepository;
    }
  
    async createList(list) {
      return await this.ListRepository.create(list);
    }
  
    async getListsByUserId(userId) {
      return await this.ListRepository.findByUserId(userId);
    }
  
    async getListById(id) {
      return await this.ListRepository.findById(id);
    }
  
    async getAllLists() {
      return await this.ListRepository.findAll();
    }
  
    async updateList(id, list) {
      return await this.ListRepository.update(id, list);
    }
  
    async deleteList(id) {
      return await this.ListRepository.delete(id);
    }
  }