const Part = require("../models/Part");
const Section = require("../models/Section");

module.exports = {
    async savePart(req, res){
        const sectionID = req.params.sectionID;
        const courseID = req.params.courseID;
        const { name, position } = req.body;

        const newPart = new Part({
            name,
            position,
            sectionID,
            courseID
        })

        await newPart.save(async (err, part) => {
            if(err) return res.status(500).send("Error al guardar la parte");

            if(!part) return res.status(404).send("Los datos de la parte no son válidos");

            if(part){
                const section = await Section.findById(part.sectionID);
                if(section){
                    console.log(part._id)
                    section.partsID.push(part._id);
                    await Section.findByIdAndUpdate(section._id, section, {new: true}, (err, section) => {
                        if(err) return res.send("Ha ocurrido un error al agregar la parte");

                        if(!section) return res.send("Los datos de la parte no son válidos");

                        if(section) return res.status(200).send(section);
                    })
                }
            }
        })
    },
    async updatePart(req, res){
        partID = req.params.id;

        await Part.findByIdAndUpdate(partID, req.body, {new: true},(err, part) => {
            if(err) return res.status(500).send("Ha ocurrido un error al modificar la parte");

            if(!part) return res.status(404).send("Los datos de la parte no son válidos");

            if(part) return res.status(200).send(part);
        })
    },
    async deletePart(req, res){
        partID = req.params.id;

        await Part.findByIdAndDelete(partID, async (err, part) => {
            if(err) return res.status(500).send("Ha ocurrido un error al eliminar la parte");

            if(!part) return res.status(404).send("Los datos de la parte no son válidos");

            if(part){
                const section = await Section.findById(part.sectionID);
                if(section){
                    const indice = section.partsID.indexOf(part._id);
                    section.partsID.splice(indice, 1);
                    await Section.findByIdAndUpdate(part.sectionID, section, (err, section) => {
                        if(err) return res.status(500).send("Ha ocurrido un error al borrar la parte");

                        if(!section) return res.status(404).send("Los datos de la parte no son válidos");

                        if(section) return res.status(200).send("Parte eliminada con éxito");
                    })
                }
            }
        })
    },
    async getParts(req, res){
        courseID = req.params.courseID;
        partID = req.params.partID;

        await Part.find({courseID, partID}, (err, part) => {
            if(err) return res.status(500).send("Ha ocurrido un error al buscar las partes");

            if(!part) return res.status(404).send("Los datos de las partes no son válidos");

            if(part) return res.status(200).send(part);
        })
    },
    async getPart(req, res){
        partID = req.params.id;
        await Part.findById(partID, (err, part) => {
            if(err) return res.status(500).send("Ha ocurrido un error al buscar la parte");

            if(!part) return res.status(404).send("Los datos de la parte no son válidos");

            if(part) return res.status(200).send(part);
        })
    }
}