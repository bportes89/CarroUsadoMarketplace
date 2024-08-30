let web3;
let contract;
const contractAddress = '0x540d7E428D5207B30EE03F2551Cbb5751D3c7569';
const contractABI = [[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "vendedor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "marca",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "modelo",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ano",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "preco",
				"type": "uint256"
			}
		],
		"name": "CarroListado",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "vendedor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "comprador",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "preco",
				"type": "uint256"
			}
		],
		"name": "CarroVendido",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "comprarCarro",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_marca",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_modelo",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_ano",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_preco",
				"type": "uint256"
			}
		],
		"name": "listarCarro",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "carros",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "vendedor",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "marca",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "modelo",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "ano",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "preco",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "vendido",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getCarroPorId",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "vendedor",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "marca",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "modelo",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "ano",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "preco",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "vendido",
						"type": "bool"
					}
				],
				"internalType": "struct CarroUsadoMarketplace.Carro",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalCarros",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
    // Insira o ABI do seu contrato aqui
];

async function init() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            contract = new web3.eth.Contract(contractABI, contractAddress);
            loadCarros();
        } catch (error) {
            console.error("Usuário negou acesso à conta");
        }
    } else {
        console.log('Por favor, instale o MetaMask!');
    }
}

async function listarCarro(event) {
    event.preventDefault();
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const ano = document.getElementById('ano').value;
    const preco = document.getElementById('preco').value;

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.listarCarro(marca, modelo, ano, preco).send({ from: accounts[0] });
        alert('Carro listado com sucesso!');
        loadCarros();
    } catch (error) {
        console.error('Erro ao listar carro:', error);
    }
}

async function comprarCarro(event) {
    event.preventDefault();
    const carroId = document.getElementById('carroId').value;
    const valorPagamento = document.getElementById('valorPagamento').value;

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.comprarCarro(carroId).send({ from: accounts[0], value: valorPagamento });
        alert('Carro comprado com sucesso!');
        loadCarros();
    } catch (error) {
        console.error('Erro ao comprar carro:', error);
    }
}

async function loadCarros() {
    const listaCarros = document.getElementById('listaCarros');
    listaCarros.innerHTML = '';

    try {
        const totalCarros = await contract.methods.totalCarros().call();
        for (let i = 1; i <= totalCarros; i++) {
            const carro = await contract.methods.getCarroPorId(i).call();
            const li = document.createElement('li');
            li.textContent = `ID: ${carro.id}, Marca: ${carro.marca}, Modelo: ${carro.modelo}, Ano: ${carro.ano}, Preço: ${carro.preco} wei, Vendido: ${carro.vendido}`;
            listaCarros.appendChild(li);
        }
    } catch (error) {
        console.error('Erro ao carregar carros:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    document.getElementById('listarCarroForm').addEventListener('submit', listarCarro);
    document.getElementById('comprarCarroForm').addEventListener('submit', comprarCarro);
});
