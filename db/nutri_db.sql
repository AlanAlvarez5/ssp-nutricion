DROP DATABASE IF EXISTS nutricion;
CREATE DATABASE nutricion;
use nutricion;

create table if not exists administrador(
	nue varchar(06) not null auto_increment,
    nombres varchar(75) not null,
    apellido_p varchar(30) not null,
    apellido_m varchar(30),
    correo varchar(40) not null,
    password varchar(40) not null,
    primary key (nue)
)ENGINE = INNODB;

create table if not exists contacto(
	id int not null auto_increment,
    p_nombre varchar(30) not null,
    s_nombre varchar(30),
	apellido_p varchar(30) not null,
    apellido_m varchar(30),
    telefono varchar(10) not null,
    correo varchar(40) not null,
    direccion varchar(100) not null,
    colonia varchar(30) not null,
    ciudad varchar(30) not null,
    estado varchar(30) not null,
    primary key(id)
)ENGINE = INNODB;

create table if not exists alumno(
	nua varchar(06) not null,
    contacto_id int not null auto_increment,
    p_nombre varchar(30) not null,
    s_nombre varchar(30),
	apellido_p varchar(30) not null,
    apellido_m varchar(30),
    genero varchar(30) not null,
    edad int not null,
    estado_civil varchar(30) not null,
    fecha_nacimiento date not null,
    ciudad_nacimiento varchar(30) not null,
    estado_nacimiento varchar(30) not null,
    domicilio_residencia varchar(200) not null,
    domicilio_origen varchar(200) not null,
    nombre_division varchar(200) not null,
    programa_educativo varchar(50) not null,
    periodo varchar(40) not null,
    fecha_ingreso date not null,
    correo varchar(40) not null,
    nue varchar(06),
    descubrimiento varchar(50),
    disponibilidad varchar(200),
    nutri_estado varchar(30) not null,
    fecha_cierre varchar(30) not null,
    causas_cierre varchar(30) not null,
    primary key(nua)
)engine = innodb;

create table if not exists consulta(
	fecha datetime not null,
    nua varchar(06) not null,
    nue varchar(06) not null,
    primary key(fecha, nua, nue),
    constraint fk_consulta_administrador foreign key (nue)
		references administrador(nue)
        on delete cascade
        on update cascade,
	constraint fk_consulta_alumno foreign key(nua)
		references alumno(nua)
        on delete cascade
        on update cascade
)engine = innodb;

create table if not exists riesgo_nutricio(
	nua varchar(06) not null,
    periodo varchar(30) not null,
    padecimiento_actual varchar(50),
    cirugias varchar(50),
    tratamiento varchar(50),
    n_comidas int not null,
    desayuno boolean not null,
    comida boolean not null,
    cena boolean not null,
    colaciones boolean not null,
    hora_apetito varchar(20) not null,
    lugar_comida varchar(30) not null,
    cocinero varchar(30) not null,
    servicios_basicos boolean not null,
    cantidad_agua float(6,2) not null,
    consumo_tablaco boolean not null,
    cantidad_tabaco float(6,2) not null,
    consumo_alcohol boolean not null,
    cantidad_alcohol float(6,2) not null,
    consumo_azucar boolean not null,
    cantidad_azucar float(6,2) not null,
    criterio_1 boolean not null,
	criterio_2 boolean not null,
	criterio_3 boolean not null,
	criterio_4 boolean not null,
	criterio_5 boolean not null,
    diagnostico varchar(200) not null,
    institucion varchar(60) not null,
    primary key (nua, periodo),
    constraint fk_riesgo_alumno foreign key(nua)
		references alumno(nua)
        on delete cascade
        on update cascade
)engine = innodb;

create  table if not exists historia_clinica(
	id int not null auto_increment,
    cardiovascular boolean not null,
    endocrina boolean not null,
    nefrologica boolean not null, 
    gastrointestinal boolean not null,
    ginecologica
)engine = innodb;

create table if not exists historia_clinica(
	nua varchar(06) not null,
    periodo varchar(30) not null,
    en_id int not null,
    hra_id int not null,
    diagnostico varchar(00),
    monitoreo varchar(400),
    primary key (nua, periodo)
)engine = innodb;





