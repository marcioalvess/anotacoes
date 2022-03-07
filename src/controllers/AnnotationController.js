const Annotations = require ('../models/AnnotationData');

module.exports = {

    async read( req, res){
        const annotationList = await Annotations.find();

        return res.json(annotationList);
    },
/* o create vai buscar a requisição(request) no corpo do body */
/* o async deve ser adicionado toda as vezes que o banco for requisitado */
    async create(req, res) {
        const{ title, notes, priority} = req.body;

/* mensagem de erro */
        if (!notes || !title){
            return res.status(400).json({ error: "Necessário um título/anotação!"});
        }

        const annotationCreated = await Annotations.create({
            title,
            notes,
            priority
        });

        return res.json(annotationCreated);
             
    },

    async delete(req, res) {
        const { id } = req.params;

        const annotationDeleted = await Annotations.findOneAndDelete({ _id : id });

        if(annotationDeleted){
            return res.json(annotationDeleted);
        }

        return res.status(401).json({ error: 'Não foi encontrado o registro para deletar!'});
    }
}





