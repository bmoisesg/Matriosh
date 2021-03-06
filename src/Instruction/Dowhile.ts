import { Instruction } from "../Abstract/Instruction"
import { Expression } from "../Abstract/Expression"
import { Environment } from "../Symbol/Environment"
import { get, Type } from "../Abstract/Retorno"
import { Singleton } from "../Singleton/Singleton"
import { error } from "../tool/error"

export class DoWhile extends Instruction {

    constructor(
        private condicion: Expression,
        private code: Instruction,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Environment) {

        let c = this.condicion.execute(env)
        if (c.type != Type.BOOLEAN) throw new error("Semantico", `La condicion de la instruccion do while tiene que ser tipo [BOOLEAN] y se reconocio el tipo [${get(c.type)}]`, this.line, this.column)

        while (c.value) {
            this.code.execute(env)
            c = this.condicion.execute(env)
            if (c.type != Type.BOOLEAN) throw new error("Semantico", `La condición de la instruccion do while tiene que ser tipo [BOOLEAN] y se reconocio el tipo [${get(c.type)}]`, this.line, this.column)
        }
    }
    public ast() {
        const s = Singleton.getInstance()
        const name_node = `node_${this.line}_${this.column}_`
        s.add_ast(`
        ${name_node}[label="\\<Instruccion\\>\\ndo while"];
        ${name_node}1[label="\\<Condicion\\>"];
        ${name_node}->${name_node}1;
        ${name_node}1->${this.condicion.ast()}
        ${name_node}->node_${this.code.line}_${this.code.column}_;        
        `)
        this.code.ast()

    }
}