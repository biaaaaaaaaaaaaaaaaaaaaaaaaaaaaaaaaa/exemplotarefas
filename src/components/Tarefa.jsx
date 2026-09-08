import {useState, useEffect} from 'react'
import '../css/estilo.css'

const Tarefa = () => {

    //Hook- useState -Manipula o estado da variável
    const [tarefas,setTarefas]=useState(()=>{
        const salvarTarefas = localStorage.getItem("item-tarefa");
        return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });

    const [campo,setCampo]=useState("");

    //HOOK - useEffect - Realiza o efeito colateral, nesse exmeplo
    //vai mostrar a tarefa adicionada em tempo real
    useEffect(()=>{
        localStorage.setItem("item-tarefa",JSON.stringify(tarefas))
    },[tarefas])

    //FUNÇÃO ADICIONAR TAREFA
    const  AdicionarTarefa =(e)=>{
      //Previne que a página se recarregue automaticamente
      e.preventDefault();
      //Valida se o campo estiver vazio
      if(!campo.trim()) return;

      //novo objeto
      const novaTarefa={
        id: Date.now(),
        texto:campo,
      }
      setTarefas([...tarefas,novaTarefa]);
      setCampo('');
    }
    //FUNÇÃO REMOVER TAREFA
    const RemoverTarefa=(id)=>{
      //VERIFICA SE O ID DA TAREFA ATUAL É DIFERENTE DO ID QUE DESEJA APAGAR
      //SE O ID FOR IGUAL(TAREFA QUE DESEJA APAGAR) A CONDIÇÃO RETORNA FALSO 
      //E O ITEM É EXCLUIDO
      const apagarTarefa = tarefas.filter((tarefa)=> tarefa.id !== id);
      setTarefas(apagarTarefa);

    }


  return (
    <div className="max-w-md mx-auto mt-10 bg-red-800 rounded-2xl shadow-lg shadow-amber-200 border boder-red-500">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">Minha Lista de Tarefas</h1>
      <form onSubmit={AdicionarTarefa} className="flex gap-2 mb-6">
        <input
          type="text"
          value={campo}
          onChange={(e)=>setCampo(e.target.value)}
          placeholder='Digite sua Tarefa'
          className="felx-1 px-4 py-2 border border-black rounded-2xl focus:outline-none focus:ring-1 focus:ring-pink-950 focus:border-transparent text-black placeholder:text-gray-700"
        />
        <button type="submit" className="bg-red-950 hover: border-red-950 text-red-300 font-medium px-5 py-2 rounded-2xl transition-colors cursor-pointer">Adicionar</button>
      </form>

      <ul className='space-y-3'>
        {tarefas.map((tarefa)=>(
          <li key={tarefa.id} className='flex items-center justify-between p-3 bg-red-900 border border-red-500 rounded-2xl shadow-sm hover:bg-red-400'>
            <span>{tarefa.texto}</span>
            <button onClick={()=>RemoverTarefa(tarefa.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      {/* COMPARA SE NÃO TIVER TAREFAS DEIXA A MENSAGEM NENHUMA TAREFA SALVA */}
      {tarefas.length === 0 && <p>Nenhuma Tarefa Salva</p>}
      
    </div>
  )
}

export default Tarefa
