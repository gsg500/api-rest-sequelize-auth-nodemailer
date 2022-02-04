const jsonCubagem = require('../../database/json/cubagem.json');
const componenteModel = require('../../models/componente');

module.exports = async (req, res, next) => {
	try {

		const remessa = req.body; 
		const lista = remessa.filter((Curr) => {
			return typeof Curr.id === 'number'
    && typeof Curr.quantidade === 'number'
    && Curr.id > 0 && Curr.quantidade > 0;
		});

		const componentes = await componenteModel.findAll({ where: { isDeleted: null }});
		const select = lista.map((corret, indice) => {
			const result = componentes.filter((CurrComponente) => {    
				return CurrComponente.id === corret.id;});
			return result; });

		const ComponentesVolumes = select.map((corret, indice) => { 
			return (300 * (corret[0].dimessoes_altura * corret[0].dimessoes_largura * corret[0].dimessoes_profundidade)) * lista[indice].quantidade; 
		});

		const PesoBrutoComponentes = select.map((corret, indice) => {
			return (corret[0].peso_bruto * lista[indice].quantidade); 
		});
 
		const ComponentesPesoLiquido = select.map((corret, indice) => {
			return (corret[0].peso_liquido * lista[indice].quantidade); 
		});

		const volume = ComponentesVolumes.reduce( (accum, curr) => accum + curr );
		const bruto = PesoBrutoComponentes.reduce( (accum, curr) => accum + curr );
		const liquido = ComponentesPesoLiquido.reduce( (accum, curr) => accum + curr );

		req.volume = volume;
		req.bruto = bruto;
		req.liquido = liquido;
		return next();
    
	} catch (err) {
		console.error(err); return res.status(500)
			.json({ msg: JSON.stringify(err), msg: 'Modelo de arquivo esperado ->', jsonCubagem });
	}
};