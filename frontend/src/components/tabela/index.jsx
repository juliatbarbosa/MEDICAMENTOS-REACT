import { Pencil, Trash } from '@phosphor-icons/react'
import { BotaoIcone } from '../botao-icone'
import './index.css'

export function Tabela({ dados, abrirModalExcluir, getByIdMedicamentos }) {
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
                    dados.length > 0
                        ? (dados.map(item => (
                            <tr key={item.idmedicamento}>
                                <td className='centro'>{item.idmedicamento}</td>
                                <td>{item.nome}</td>
                                <td className='centro'>{item.quantidade}</td>
                                <td>{item.tipo}</td>
                                <td>{item.fabricante}</td>
                                <td className='icones'>
                                    <div>
                                        <BotaoIcone icone={<Pencil color='#757575' size={18} />} title="Editar" onClick={(e) => {
                                            e.preventDefault()
                                            getByIdMedicamentos(item.idmedicamento)
                                        }} />
                                        <BotaoIcone icone={<Trash color='#FA455C' size={18} />} title="Excluir" onClick={(e) => {
                                            e.preventDefault()
                                            abrirModalExcluir(item.idmedicamento)
                                        }} />
                                    </div>
                                </td>
                            </tr>
                        ))) : (
                            <tr>
                                <td colSpan="6" className="centro">
                                    Nenhuma informação a ser listada.
                                </td>
                            </tr>
                        )
                }
            </tbody>
        </table>
    )
}