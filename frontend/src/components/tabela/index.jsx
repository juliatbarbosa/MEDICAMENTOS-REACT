import { Pencil, Trash } from '@phosphor-icons/react'
import { BotaoIcone } from '../botao-icone'
import './index.css'

export function Tabela(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th className='centro'>Código</th>
                    <th>Nome</th>
                    <th className='centro'>Quantidade</th>
                    <th>Tipo</th>
                    <th>Fabricante</th>
                    <th className='icones'></th>
                </tr>
            </thead>
            <tbody>
                {
                    props.dados.map(item => (
                        <tr key={item.idmedicamento}>
                            <td className='centro'>{item.idmedicamento}</td>
                            <td>{item.nome}</td>
                            <td className='centro'>{item.quantidade}</td>
                            <td>{item.tipo}</td>
                            <td>{item.fabricante}</td>
                            <td className='icones'>
                                <div>
                                    <BotaoIcone icone={<Pencil color='#757575' size={18} />} title="Editar" />
                                    <BotaoIcone icone={<Trash color='#FA455C' size={18} />} title="Excluir" />
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}