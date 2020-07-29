DROP DATABASE IF EXISTS nutricion;
CREATE DATABASE nutricion;
use nutricion;

create table if not exists administrador(
	nue varchar(06) not null,
    nombres varchar(75) not null,
    apellido_p varchar(30) not null,
    apellido_m varchar(30),
    correo varchar(40) not null,
    password varchar(40) not null,
    primary key (nue)
)engine = innodb;

create table if not exists contacto(
	id int not null auto_increment,
    nombres varchar(30) not null,
	apellido_p varchar(30) not null,
    apellido_m varchar(30),
    telefono varchar(10) not null,
    correo varchar(40) not null,
    direccion varchar(100) not null,
    colonia varchar(30) not null,
    ciudad varchar(30) not null,
    estado varchar(30) not null,
    primary key(id)
)engine = innodb;

create table if not exists alumno(
	nua varchar(10) not null,
    contacto_id int not null,
    nombres varchar(30) not null,
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
    descubrimiento varchar(50),
    disponibilidad varchar(200),
    estado_nutri varchar(30) not null,
    fecha_cierre date,
    causas_cierre varchar(30),

    primary key(nua),

    constraint fk_alumno_contacto foreign key(contacto_id)
        references contacto(id)
        on delete cascade

)engine = innodb;

create table if not exists consulta(
	fecha date not null,
    hora_i time not null,
    hora_f time not null,
    nua varchar(06) not null,
    nue varchar(06) not null,
    primary key(fecha, nua, nue, hora_i, hora_f),
    asistencia boolean, 
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
    criterio_1 varchar(200) not null,
	criterio_2 varchar(200) not null,
	criterio_3 varchar(200) not null,
	criterio_4 varchar(200) not null,
	criterio_5 varchar(200) not null,
    diagnostico varchar(200) not null,
    institucion varchar(60) not null,
    primary key (nua, periodo),
    constraint fk_riesgo_alumno foreign key(nua)
		references alumno(nua)
        on delete cascade
        on update cascade
)engine = innodb;

create  table if not exists historia_medica(
	id int not null auto_increment,
    cardiovascular boolean not null,
    endocrina boolean not null,
    nefrologica boolean not null, 
    gastrointestinal boolean not null,
    ginecologica boolean not null,
    inicio_vida_sexual boolean not null,
    fecha_menarca int not null, 
    periodos_regulares boolean not null,
    fur varchar(30) not null,
    duracion_ciclo int not null, 
    dias_sangrado int not null,
    metodo_anticonceptivo varchar(30),
    gestas int not null,
    partos int not null,
    cesareas int not null,
    abortos int not null,
    embarazo boolean not null,
    lactando boolean not null, 
    hematologica boolean not null,
    inmunologica boolean not null,
    respiratoria boolean not null,
    odontologicas boolean not null,
    cirugias boolean not null,
    psicologicas boolean not null,
    discapacidad_fisica boolean not null,
    primary key(id)
)engine = innodb;

create  table if not exists consumo_alimento(
	id int not null auto_increment,
    cefalea boolean not null,
    nauseas boolean not null,
    vomito boolean not null,
    alteracion_apetito boolean not null,
    pirosis boolean not null,
    diarrea boolean not null,
    estrenimiento boolean not null,
    inflamacion boolean not null,
    gastralgia boolean not null,
    meteorismo boolean not null,
    ta boolean not null,
    primary key(id)
)engine = innodb;

create  table if not exists antecedentes_heredo(
	id int not null auto_increment,
    cardiovascular boolean not null,
    cardiovascular_espeficicar varchar(30) not null,
    inmunologica boolean not null, 
    lupus boolean not null,
    vih boolean not null,
    endocrina boolean not null,
    viral boolean not null,
    viral_especificar varchar(30) not null,
    gastrointestinal_especificar varchar(30) not null,
    hematologica boolean not null,
    respiratoria boolean not null,
    respiratoria_especificar varchar(30) not null,
    psicologicas boolean not null,
    psicologicas_especificar varchar(30) not null,
    primary key(id)
)engine = innodb;

create  table if not exists examen_fisico(
	id int not null auto_increment,
    fc float(6,2) not null, 
    ta float(6,2) not null, 
    fr float(6,2) not null, 
    dxtx float(6,2) not null,
    ojos varchar(40) not null,
    labios varchar(40) not null,
    dentadura varchar(40) not null,
    mucosas varchar(40) not null,
    piel varchar(40) not null,
    unas varchar(40) not null,
    abdomen varchar(40) not null,
    estrias varchar(40) not null,
    acantosis varchar(40) not null,
    edema varchar(40) not null,
    horas_sueno float(6,2) not null, 
    pruebas_bio boolean not null,
    pruebas_bio_espeficicar varchar(400) not null,
    primary key(id)
)engine = innodb;

create  table if not exists evaluacion_nutricia(
	id int not null auto_increment,
    hm_id int not null,
    ca_id int not null,
    ah_id int not null,
    ef_id int not null,
    medicamentos varchar(200),
    primary key(id),
    constraint fk_evaluacion_historia foreign key (hm_id)
        references historia_medica(id)
        on delete cascade
        on update cascade,
    constraint fk_evaluacion_consumo foreign key (ca_id)
        references consumo_alimento(id)
        on delete cascade
        on update cascade,
    constraint fk_evaluacion_antecedentes foreign key (ah_id)
        references antecedentes_heredo(id)
        on delete cascade
        on update cascade,
    constraint fk_evaluacion_examen foreign key (ef_id)
        references examen_fisico(id)
        on delete cascade
        on update cascade
)engine = innodb;

create table if not exists hra(
    id int not null auto_increment,
    tiempo_comida float(6,2) not null,
    alergias varchar(50),
    alimentos_malestar varchar(50),
    presupuesto float(6,2) not null,
    primary key(id)
)engine = innodb;


create table if not exists historia_clinica(
	nua varchar(06) not null,
    periodo varchar(30) not null,
    en_id int not null,
    hra_id int not null,
    diagnostico varchar(400) not null,
    monitoreo varchar(400) not null,
    primary key (nua, periodo),
    constraint fk_historia_evaluacion foreign key (en_id)
        references evaluacion_nutricia(id)
        on delete cascade
        on update cascade,
    constraint fk_historia_hra foreign key (hra_id)
        references hra(id)
        on delete cascade
        on update cascade,
    constraint fk_historia_alumno foreign key (nua)
        references alumno(nua)
        on delete cascade
        on update cascade
)engine = innodb;

-- Dieta Habitual

create table if not exists equivalente(
    id int auto_increment not null,
    energia float(6,3) not null,
    proteina float(6,3) not null,
    lipidos float(6,3) not null,
    hc float(6,3) not null,
    primary key (id)
)engine = innodb;

create table if not exists dieta_equivalente(
    id int not null auto_increment,
    equivalente_id int not null,
    hora time not null,
    comida varchar(30) not null,
    
    constraint fk_equivalente foreign key(equivalente_id)
		references equivalente(id),

    primary key ( id, equivalente_id, hora)
) engine = innodb;

create table if not exists dieta_habitual(
    id int not null auto_increment,
    nua varchar(6) not null,
    periodo varchar(30) not null,
    fecha date not null,
    primary key (id, periodo),
    constraint fk_nua_dieta foreign key (nua, periodo)
        references historia_clinica(nua, periodo)
        on delete cascade
) engine = innodb;

create table if not exists intervecnion_nutricia(
    nua varchar(6) not null,
    periodo varchar(30) not null,
    fecha date not null,
    geb float(6,3) not null,
    get_ float(6,3) not null,
    kcal_dia float(6,3) not null,
    macronutrimentos float(6,3) not null,
    observaciones varchar(255) not null,

    constraint fk_nua_in foreign key (nua, periodo)
        references historia_clinica(nua, periodo)
        on delete cascade,
        
    primary key(nua, periodo, fecha)
) engine = innodb;

create table if not exists frecuencia_consumo(
    nua varchar(6) not null,
    periodo varchar(30) not null,
    nombre_alimento varchar(30) not null,
    cantidad int not null,
    cantidad_semana int not null,
    cantidad_mes int not null,

    constraint fk_nua_fc foreign key (nua, periodo)
        references historia_clinica(nua, periodo)
        on delete cascade,
    
    primary key(nua, periodo, nombre_alimento)
) engine = innodb;

create table if not exists medidas_antropometricas (
    nua varchar(6) not null,
    periodo varchar(30) not null,
    fecha date not null,
    carpo float(6,3) not null,
    complexion varchar(15) not null,
    peso float(6,3) not null,
    talla varchar(5) not null,
    imc float(6,3) not null,
    peso_ideal float(6,3) not null,
    peso_ajustado float(6,3) not null,
    perimetro_abdominal float(6,3) not null,
    cintura float(6,3) not null,
    brazo float(6,3) not null,
    icc float(6,3) not null,
    bicipital float(6,3) not null,
    tricipital float(6,3) not null,
    supra_espinal float(6,3) not null,
    subescapular float(6,3) not null,
    p_muscular float(6,3) not null,
    p_grasa float(6,3) not null,
    

    constraint fk_nua_ma foreign key (nua, periodo)
        references historia_clinica(nua, periodo)
        on delete cascade,
    
    primary key(nua, periodo, fecha)

) engine = innodb;
