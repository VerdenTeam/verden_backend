const Section = require("../models/Section");
const Course = require("../models/Course");

module.exports = {
    async saveSection(req, res){
        const courseID = req.params.id;
        const { name, position } = req.body;
        const newSection = new Section({
            name,
            position,
            courseID
        })
        
        await newSection.save(async (err, section) => {
            if(err) return res.status(500).send("Ha ocurrido un error al guardar la sección");

            if(!section) return res.status(404).send("Los datos de la sección no son válidos");

            if(section){
                const course = await Course.findById(section.courseID);
                if(course){
                    course.sectionsID.push(section._id);
                    await Course.findByIdAndUpdate(course._id, course, (err, course) => {
                        if(err) return res.send("Ha ocurrido un error al agregar la seccion");

                        if(!course) return res.send("Los datos de la sección no son válidos");

                        if(course) return res.status(200).send(course);
                    })
                }
            }
        })
    },
    async updateSection(req, res){
        sectionID = req.params.id;
        
        await Section.findByIdAndUpdate(sectionID, req.body, {new: true}, (err, section) => {
            if(err) return res.status(500).send("Ha ocurrido un error al modificar la sección");

            if(!section) return res.status(404).send("Los datos de la sección no son válidos");

            if(section) return res.status(200).send(section);
        })
    },
    async deleteSection(req, res){
        sectionID = req.params.id;

        await Section.findByIdAndDelete(sectionID, async (err, section) => {
            if(err) return res.status(500).send("Ha ocurrido un error al eliminar la sección");

            if(!section) return res.status(404).send("La id de la sección no es válida");

            if(section){
                const course = await Course.findById(section.courseID);
                if(course){
                    const indice = course.sectionsID.indexOf(section._id);
                    course.sectionsID.splice(indice, 1);
                    await Course.findByIdAndUpdate(section.courseID, course, (err, course) => {
                        if(err) return res.status(500).send("Ha ocurrido un error al borrar la seccion");

                        if(!course) return res.status(404).send("Los datos de la seccion no son válidos");

                        if(course) return res.status(200).send("Seccion eliminada con éxito");
                    })
                }
            }
        })
    },
    async getSection(req, res){
        sectionID = req.params.id;

        await Section.findById(sectionID, (err, section) => {
            if(err) return res.status(500).send("Ha ocurrido un error al buscar la sección");

            if(!section) return res.status(404).send("La id de la sección no es válida");

            if(section) return res.status(200).send(section);
        })
    },
    async getSections(req, res){
        const courseID = req.params.id;

        await Section.find({courseID}, (err, section) => {
            if(err) return res.status(500).send("Ha ocurrido un error al buscar las secciones");

            if(!section) return res.status(404).send("No se encuentran secciones");

            if(section) return res.status(200).send(section);
        })
    }
}