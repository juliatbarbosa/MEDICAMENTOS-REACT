import { useEffect, useState } from 'react'
import './App.css'
import { Tabela } from './components/tabela'
import { Input } from './components/input'
import { Botao } from './components/botao'
import { MagnifyingGlassIcon, Plus } from "@phosphor-icons/react";
import { Toast } from './components/toast'
import { Modal } from './components/modal'
import { ModalExcluir } from './components/modal-excluir'

export function App() {
  const [medicamentos, setMedicamentos] = useState([])
  const [filtro, setFiltro] = useState("")
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    success: true,
  });
  const [modal, setModal] = useState({
    visible: false,
    dados: null
  })
  const [modalExcluir, setModalExcluir] = useState({
    visible: false,
    id: null
  })

  async function getMedicamentos() {
    const response = await fetch(`http://127.0.0.1:3000/medicamento${filtro ? `?nome=${filtro}` : ""}`, {
      headers: { 'Content-Type': 'application/json' },
      method: "GET"
    })

    const data = await response.json()

    setMedicamentos(data)

  }

  async function getByIdMedicamentos(id) {
    const response = await fetch(`http://127.0.0.1:3000/medicamento/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: "GET"
    })

    const data = await response.json()

    abrirModal(data)

  }

  async function criarMedicamento(obj) {
    const response = await fetch(`http://127.0.0.1:3000/medicamento`, {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify(obj),
    })

    const data = await response.json()

    if (data.success) {
      fecharModal()
      abrirToast(data.message, data.success)
      getMedicamentos()
    } else {
      abrirToast("Falha ao cadastrar medicamento!", data.success)
    }

  }

  async function alterarMedicamento(id, obj) {
    const response = await fetch(`http://127.0.0.1:3000/medicamento/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: "PUT",
      body: JSON.stringify(obj),
    })

    const data = await response.json()

    if (data.success) {
      fecharModal()
      abrirToast(data.message, data.success)
      getMedicamentos()
    } else {
      abrirToast("Falha ao alterar medicamento!", data.success)
    }

  }

  async function deleteMedicamento(id) {
    const response = await fetch(`http://127.0.0.1:3000/medicamento/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: "DELETE"
    })

    const data = await response.json()

    if (data.success) {
      fecharModalExcluir()
      abrirToast(data.message, data.success)
      getMedicamentos()
    } else {
      abrirToast("Falha ao cadastrar medicamento!", data.success)
    }

  }

  function carregarFiltro(e) {
    setFiltro(e.target.value)
  }

  function abrirToast(message, success) {
    setToast({
      visible: true,
      message,
      success,
    })

    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  }

  function fecharToast() {
    setToast(prev => ({ ...prev, visible: false }));
  }

  function abrirModal(dados) {
    setModal({
      visible: true,
      dados
    })
  }

  function fecharModal() {
    setModal({
      visible: false,
      dados: null
    })
  }

  function abrirModalExcluir(id = null) {
    setModalExcluir({
      visible: true,
      id
    })
  }

  function fecharModalExcluir() {
    setModalExcluir({
      visible: false,
      id: null
    })
  }

  useEffect(() => {
    getMedicamentos()
  }, [filtro])

  return (
    <>
      <header>
        <img src="./public/logo.png" alt="" />
        <Botao icone={<Plus color="#C975F4" size={16} />} titulo="Novo medicamento" variante="outline" onClick={() => abrirModal()} />
      </header>
      <div className='titulo'>
        <h1>Medicamentos</h1>
        <span>Gerencie e organize os medicamentos.</span>
      </div>
      <div className='pesquisa'>
        <Input icone={<MagnifyingGlassIcon color="#C975F4" size={16} />} type="text" placeholder="Pesquisar medicamento..." onChange={carregarFiltro} />
      </div>
      <Tabela dados={medicamentos} abrirModalExcluir={abrirModalExcluir} abrirModal={abrirModal} getByIdMedicamentos={getByIdMedicamentos} />
      {toast.visible && (
        <Toast message={toast.message} success={toast.success} fecharToast={fecharToast} />
      )}
      {modal.visible && (
        <Modal dados={modal.dados} fecharModal={fecharModal} criarMedicamento={criarMedicamento} alterarMedicamento={alterarMedicamento} />
      )}
      {modalExcluir.visible && (
        <ModalExcluir id={modalExcluir.id} fecharModalExcluir={fecharModalExcluir} deleteMedicamento={deleteMedicamento} />
      )}
    </>

  )

}
