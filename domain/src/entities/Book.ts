export class Book {
  constructor(
    public id: string,
    public title: string,
    public author: string,
    public publicationYear: number,
    private _isTaken: boolean = false
  ) {}

  static create(props: {
    id: string;
    title: string;
    author: string;
    publicationYear: number;
  }): Book {
    if (!props.title || !props.author) {
      throw new Error("Faltan datos obligatorios del libro");
    }
    return new Book(
      props.id,
      props.title,
      props.author,
      props.publicationYear
    );
  }

  
  static fromPersistence(data: {
    id: string;
    title: string;
    author: string;
    publicationYear: number;
    isTaken: boolean;
  }): Book {
    const book = new Book(
      data.id,
      data.title,
      data.author,
      data.publicationYear,
      data.isTaken
    );
    return book;
  }

  get isTaken(): boolean {
    return this._isTaken;
  }

  markAsBorrowed(): void {
    if (this._isTaken) throw new Error("El libro ya fue prestado");
    this._isTaken = true;
  }

  markAsReturned(): void {
    if (!this._isTaken) throw new Error("El libro no está prestado");
    this._isTaken = false;
  }
}
