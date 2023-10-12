import { Comments } from "./Comment";

export class Suggestion{

  constructor(
    public id_user?: number,
    public comments?: Array<Comments>
    ){}

}
