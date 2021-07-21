const chai = require('chai');
const chaiHttp = require('chai-http');
//const should =  require('chai').should();
const should =  require('should');
const assert = require('assert');
const expect = require('expect.js');

var mongoose = require("mongoose");
var server = require('../index');

var Cliente = require("../models/cliente-model");

chai.use(chaiHttp);

describe('Model cliente', function() {

    // this.beforeEach( function(done) {
    //     var newCliente = new Cliente({
    //         nombres : "Maria",
    //         apellidos : "Olvera",
    //         identificacion : "09854745212",
    //         telefono : "48425552",
    //         email: "maria@gmail.com",
    //         direccion: "norte de la ciudad",
    //         fechanacio: "1959/03/07"
    //     });
    //     newCliente.save( function(err) {
    //         done();
    //     })
    // })

    // this.afterEach(function(done) {
    //     Cliente.collection.drop().then( function() {

    //     }).catch( function() {
    //         console.warn('Colleccion no existe');
    //     })
    //     done()
    // })

    // OK FUNCIONANDO
    it('GET clientes', function(done) {
        chai.request(server)
            .get('/peluqueria/api/cliente/all/page/1/')
            .end(function(err, res) {
                
                should.exist(res.body);
                should(res.body.clientes[0]).have.properties(['nombres','apellidos','identificacion','telefono','email','direccion','fechanacio']);  
                assert.ok(true);
                expect(res.body).to.have.property('page');
                expect(res.body).to.have.property('clientes');
                expect(res.body.clientes).to.not.be.empty();

                done();
                
            });
    });

    it('POST', function(done) {
        chai.request(server)
            .post('/peluqueria/api/cliente/add/')
            .send({
                nombres : "Elena",
                apellidos : "Suarez",
                identificacion : "030304589552",
                telefono : "05090407256",
                email: "elena@gmail.com",
                direccion: "Sur de la ciudad",
                fechanacio: "2000/03/07"
            })
            .end(function(err, res) {

                // the res object should have a status of 201
                should(res.status).be.exactly(200);
                should(res.body).be.json;
                //should(res.body.cliente).be.a('object');
                should(res.body.cliente).have.properties(['nombres','apellidos','identificacion','telefono','email','direccion','fechanacio']);  
                should(res.body.cliente.nombres).equal('Elena')
                should(res.body.cliente.identificacion).equal('030304589552')
            
                done();
            });
    });

    it('PUT', function(done) {
        chai.request(server)
            .get('/peluqueria/api/cliente/all/')
            .end(function(err, res) {
                console.log(res.body.clientes[0]._id);
                chai.request(server)
                    .put('/peluqueria/api/cliente/edit/' + res.body.clientes[0]._id)


                    .send({
                        telefono : "484255528455",
                        email: "mariaolvera@gmail.com",
                    })

                    .end(function(error, resp) {

                        should(resp.status).be.exactly(200);
                    
                        should(resp.body.cliente).have.property('email','mariaolvera@gmail.com');
                        should(resp.body.cliente).have.property('telefono','484255528455');
                        should(resp.body).have.property('ok', true);

                        done();

                    });
            });
    });

    it('DELETE', function(done) {
        chai.request(server)
            .get('/peluqueria/api/cliente/all/')
            .end(function(err, res) {
                console.log(res.body.clientes[2]._id);
                chai.request(server)
                    .delete(`/peluqueria/api/cliente/delete/${res.body.clientes[2]._id}/`)
                    .end(function(error, response) {
                        should(response.status).be.exactly(200);
                        should(response.body).have.property('msg');
                        should(response.body).have.property('ok',true);
                        
                        done();
                    });
            });
    });


});