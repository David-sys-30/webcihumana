'use strict'

class Curso{
	constructor(nombreCurso, descripcionCurso, aprendizajeCurso, objetivoCurso, duracionCurso, urlCurso, statusCurso, imagenCurso){
		this.nombreCurso = nombreCurso;
		this.descripcionCurso = descripcionCurso;
		this.aprendizajeCurso = aprendizajeCurso;
		this.objetivoCurso = objetivoCurso;
		this.duracionCurso = duracionCurso;
		this.urlCurso = urlCurso;
		this.statusCurso = statusCurso;
		this.imagenCurso = imagenCurso;
	}
}

module.exports = Curso;