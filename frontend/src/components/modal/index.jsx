import { useEffect, useState } from 'react';
import { Input } from '../input';
import './index.css';
import { X } from '@phosphor-icons/react';
import { Botao } from '../botao';

export function Modal({ dados, fecharModal, criarMedicamento, alterarMedicamento }) {
    const [nome, setNome] = useState('')
    const [fabricante, setFabricante] = useState('')
    const [tipo, setTipo] = useState('')
    const [quantidade, setQuantidade] = useState('')

    useEffect(() => {
        if (dados) {
            setNome(dados.nome || '')
            setFabricante(dados.fabricante || '')
            setTipo(dados.tipo || '')
            setQuantidade(dados.quantidade || '')
        }
    }, [dados])

    const obj = {
        "nome": nome,
        "fabricante": fabricante,
        "tipo": tipo,
        "quantidade": quantidade
    }

    return (
        <div className='fundoModal'>
            <div className='container'>
                <h3>
                    {dados ? "Editar medicamento" : "Novo medicamento"}
                </h3>
                <button className='botaoFecharModal' onClick={fecharModal} >
                    <X />
                </button>

                <form className='formulario' autoComplete='off'>
                    <div className="form">
                        <label htmlFor="nome">Nome</label>
                        <Input type="text" id="nome" name="nome" onChange={(e) => setNome(e.target.value)} value={nome} />
                    </div>
                    <div className="form">
                        <label htmlFor="fabricante">Fabricante</label>
                        <Input type="text" id="fabricante" name="fabricante" onChange={(e) => setFabricante(e.target.value)} value={fabricante} />
                    </div>
                    <div className="form">
                        <label htmlFor="tipo">Tipo</label>
                        <Input type="text" id="tipo" name="tipo" onChange={(e) => setTipo(e.target.value)} value={tipo} />
                    </div>
                    <div className="form">
                        <label htmlFor="quantidade">Quantidade</label>
                        <Input type="number" id="quantidade" name="quantidade" onChange={(e) => setQuantidade(e.target.value)} value={quantidade} />
                    </div>
                    <div className='linhaBotoes'>
                        <Botao titulo="Cancelar" variante='outline' onClick={fecharModal} />
                        <Botao titulo="Salvar" type="submit" onClick={(e) => {
                            e.preventDefault()
                            if (dados) {
                                alterarMedicamento(dados.idmedicamento, obj)
                            } else {
                                criarMedicamento(obj)
                            }
                        }
                        } variante='primary' />
                    </div>
                </form>
            </div>
        </div>
    )
}