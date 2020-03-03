const mongoose  = require('../../database/index');


const ProjectSchema = new mongoose.Schema({
    titulo:{
        type: String,
        require: true,
    },
    descricao:{
        type: String,
        require: true,
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    tasks:[{        //Criei o Task utilizando [{}] porque poderão ser mais de 1 Task associados a 1 projeto
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
    createdAt:{
        type: Date,
        default: Date.now,
    },
});


const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;