import { useState } from 'react';
import { Input } from '../input';
import './index.css';
import { X } from '@phosphor-icons/react';
import { Botao } from '../botao';

export function ModalExcluir({id = null, fecharModalExcluir, deleteMedicamento }) {


    return (
        <div className='fundoModalExcluir'>
            <div className='container'>
                <h3>
                    Excluir
                </h3>
                <button className='botaoFecharModal' onClick={fecharModalExcluir} >
                    <X />
                </button>

                <form className='formulario'>

                    <p>Deseja excluir esse medicamento?</p>
                    
                    <div className='linhaBotoes'>
                        <Botao titulo="Não" variante='outline' onClick={fecharModalExcluir} />
                        <Botao titulo="Sim" type="submit" onClick={(e) => {
                            e.preventDefault()
                            deleteMedicamento(id)
                        }
                        } variante='primary' />
                    </div>
                </form>
            </div>
        </div>
    )
}