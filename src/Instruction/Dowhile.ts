import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Abstract/Retorno";

export class DoWhile extends Instruction{

    constructor(private condition : Expression, private code : Instruction, line : number, column : number){
        super(line, column);
    }

    public execute(env : Environment) {
        let condition = this.condition.execute(env);
        if(condition.type != Type.BOOLEAN){
            throw new Error("<tr><td>semantico</td><td>La expresion del dowhile no es una condicion 'boolean'</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
        }

        do {
            this.code.execute(env);
            condition = this.condition.execute(env);
            if(condition.type != Type.BOOLEAN){
                throw new Error("<tr><td>semantico</td><td>La expresion del dowhile no es una condiicon 'boolean'</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
        }
        while  (condition.value == true)
    }
}