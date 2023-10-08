export class Category{
    category_id: number;
    code: string;
    category: string;
    status: number;
  
    constructor(category_id: number, code: string, category: string, status: number) {
      this.category_id = category_id;
      this.code = code;
      this.category = category;
      this.status = status;
    }
  }
  