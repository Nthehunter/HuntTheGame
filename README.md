# HuntTheGame

![alt text](/Capturas/logo.png)  

## Table of Contents
1. [Introducción](#introducción)
2. [Modelo de datos](#modelo-de-datos)
3. [Requisitos de Usuario](#requisitos-de-usuario)
4. [Casos de uso](#casos-de-uso)
5. [Funcionamiento del sistema](#funcionamiento-del-sistema)
6. [Interfaces](#interfaces)
7. [Manual de instalación](#manual-de-instalación)
8. [Pila tecnológica](#pila-tecnológica)
9. [Comparación de tecnologías](#comparación-de-tecnologías)
10. [Planificación](#planificación)
11. [Conclusión](#conclusión)


## Introducción

Hunt The Game es una aplicación creada para satisfacer a los aficionados de los videojuegos que se enorgullecen de mostrar su colección de videojuegos que poseen a otros usuarios, además de mostrar el tiempo que le han dedicado a dicho juego y si lo han completado o no.

La aplicación no ha sido desarrollada para ninguna empresa, ha sido desarrollada como proyecto de clases.

En la APP además de lo mencionado anteriormente, los usuarios tendrán su propia cuenta con su nombre único e incluso podrán personalizar su foto de perfil, pudiendo en cualquier momento personalizar su perfil o colección.

Además existe un backend y frontend que usan graphql y vaadin en la que solo el administrador podrá acceder y realizar de manera más sencilla las operaciones del CRUD.

https://github.com/christianAlexMoreVer/Proyecto-Duo-SGV

Los juegos son añadidos por el usuario administrador para evitar que los propios usuarios añadan juegos inexistentes, además cada tiempo de uso y estado del juego es exclusivo de cada usuario.

## Modelo de datos

En este apartado de la documentación se explicarán y mostrarán los diagramas realizados durante la creación de la base de datos que utiliza la aplicación.

### Diagrama entidad-relación:
![alt text](/Capturas/ER.png) 

Como se puede apreciar existen 2 entidades: “AppUser” y “VideoGame”, que están relacionados entre sí por “Collects”.

Es decir un usuario puede coleccionar ningún o muchos videojuegos y a su vez un videojuego puede ser coleccionado por un usuario o por ninguno.

AppUser tiene como atributos: “Photo”, “idAppUser”, “Email”, “Password”, “Username” y “Rol”.

VideoGame tiene como atributos: “Name”, “idVideoGame” y “Photo”.

Collects tiene como atributos: “State” y “GameTime”. Estos atributos nacen porque cada usuario tiene su propio estado y tiempo de uso en los videojuegos de su colección.

Music tiene como atributos: "BackgroundMusic" y "InUse". 

### Diagrama del modelo relacional:
![alt text](/Capturas/R.png) 

Al ser una relación de N:M en el modelo relacional la relación pasa a ser una tabla propia, que posee como clave primaria y foránea las claves principales de VideoGame y AppUser.

Las claves primarias de Collection tienen como restricción que se eliminen y actualicen en cascada. Es decir si se elimina un usuario o videojuego la colección que esté asociada al elemento eliminado será eliminada también.

Atributos en detalle para AppUser:
idAppUser: Tipo int, clave primaria, no puede ser null, se autoincrementa y empieza a partir de 1.

Email: Tipo varchar, longitud máxima 320 caracteres, no puede ser null ni tampoco repetirse.

Password: Tipo varchar, longitud máxima 255 caracteres, no puede ser null.
 
UserName: Tipo varchar, longitud máxima 45 caracteres, no puede ser null ni tampoco repetirse.
 
Photo: Tipo varchar, puede ser null.

Rol: Tipo bit, puede ser null.


Atributos en detalle para VideoGame:
idVideoGame: Tipo int, clave primaria, no puede ser null, se autoincrementa y empieza a partir de 1.

Name: Tipo varchar, longitud máxima 45 caracteres, no puede ser null ni tampoco repetirse.
 
Photo: Tipo varchar, puede ser null.


Atributos en detalle para VideoGame:
idVideoGame: Tipo int, clave primaria, hace referencia a la clave primaria de VideoGame.

idAppUser: Tipo int, clave primaria, hace referencia a la clave primaria de AppUser.

State: Tipo bit, no puede ser null.
 
GameTime: Tipo int, no puede ser null.


Atributos en detalle para Music:
idMusic: Tipo int, clave primaria, hace referencia a la clave primaria de Music.

BackgroundMusic: varchar(255), no puede repetirse el valor.

InUse: tipo bit, no puede ser null.


## Requisitos de Usuario

* R1. Plataforma

  * R1.1. La aplicación será funcional en dispositivos móviles y de sobremesa.

  * R1.2. Para su correcto uso será totalmente dependiente de tener conexión a internet.
  

* R2. Usuarios

  * R2.1. Los usuarios necesitarán tener una cuenta para poder acceder a las funciones disponibles.

  * R2.2. Los usuarios pueden crearse una cuenta si no disponen de ella.

  * R2.3. Existirá un usuario administrador que tendrá permisos especiales.

  * R2.4. Los usuarios que no cumplan las normas podrán ser eliminados por el administrador.
  

* R3. Videojuegos

  * R3.1. El administrador será el encargado de añadir los juegos a la plataforma.

  * R3.2. Los usuarios podrán añadir estos juegos a sus colecciones.
  

* R4. Colección

  * R4.1. Cada usuario tendrá su propia colección de videojuegos y podrá modificarla.

  * R4.2. Cada juego de la colección tendrá un estado y un tiempo de uso dependiendo del valor asignado por el usuario.

  * R4.3. Las colecciones de cada usuario pueden ser vistas por otros usuarios.


* R5. Para poder acceder al menú principal los usuarios previamente deberán pasar el login.


* R6. Home.

  * R6.1. En el home se dará una bienvenida al usuario con su nombre y foto de perfil.
  

* R7. Menú superior.

  * R7.1. En el menú superior se mostrará un icono del menú, logo de la web y un ícono del perfil de usuario.
  

* R8. Menú lateral.

  * R8.1. Se desplegará lateralmente al clicar en el icono de menú.

  * R8.2. Se mostrarán las distintas opciones que puede hacer el usuario.

  * R8.2.1. Dichas opciones son: Home, ver mi perfil, ver mis juegos, buscar otros usuarios, cerrar menú, cerrar sesión.

  * R8.3. Este menú será distinto cuando se esté usando la cuenta de administrador, dando una opción extra.

    * R8.3.1. El administrador tendrá la opción de ir a un panel de administración.

  * R8.4. El menú podrá cerrarse deslizando el menú, clicando fuera de él o seleccionando la opción de cerrar menú.
  

* R9. Barras de búsqueda.

  * R9.1. Los usuarios podrán usarla para buscar por su nombre los juegos que posean en su colección o añadir juegos a su colección.

 * R9.2. Los usuarios podrán usarla para buscar a otros usuarios por su nombre de usuario y ver el perfil del usuario deseado.

  * R9.3. Las barras de búsqueda realizarán su función cuando se haga click en el botón de buscar.

  * R9.4. Cuando se esté realizando la búsqueda se mostrará un gif para indicar al usuario que está cargando.
  

* R10. Cuando se quiera eliminar una cuenta se preguntará si está seguro de la acción deseada.


* R11. Los datos introducidos en los formularios serán validados y se le informará al usuario como deben de ser.


* R12. Al ocurrir un error entre la conexión con el backend se intentará informar al usuario de dicho error.


* R13. Perfil de usuario

  * R13.1. El perfil de usuario podrá ser modificado por el dueño de la cuenta o en caso especial por el administrador.

  * R13.2. Los usuarios podrán modificar su foto de perfil.

  * R13.3. Los usuarios podrán eliminar su propia cuenta.


* R14. Panel de administración

  * R14.1. El panel de administración sólo será accesible por el administrador.

  * R14.2. En el panel de administración se mostrarán dos opciones que serán administrar juegos o usuarios.

    * R14.2.1. Dependiendo de la opción elegida el administrador podrá modificar y eliminar usuarios o juegos.

    * R14.2.2. En el caso de los videojuegos además se podrá añadir videojuegos.
    
* R15. Aplicación alterna

  * R15.1. La aplicación alterna solo será accecible por el usuario administrador.

  * R15.2. El administrador podrá realizar un CRUD completo de los usuarios, videojuegos y música.

* R16. Música

  * R16.1. Solo sonará en la aplicación alterna.

  * R16.2. Al realizar una actualización de una música se deberá de introducir si o si un fichero de audio.



## Casos de uso

![alt text](/Capturas/Case.jpg) 

Los usuarios que hayan iniciado sesión podrán manejar su colección de videojuegos, manejar su cuenta y además podrán ver la colección de otros usuarios.

El administrador puede hacer lo mismo que un usuario normal además de poder modificar a todos los usuarios y a todos los videojuegos.

Un usuario que no se ha logueado podrá iniciar sesión y en caso de no tener cuenta podrá crearse una propia.

## Funcionamiento del sistema

![alt text](/Capturas/mindmup.png) 

## Interfaces

### Diseño inicial

![alt text](/Capturas/prop1.png)        ![alt text](/Capturas/prop2.png)

![alt text](/Capturas/prop3.png)        ![alt text](/Capturas/prop4.png)

![alt text](/Capturas/prop5.png)        ![alt text](/Capturas/prop6.png)

![alt text](/Capturas/prop7.png)        ![alt text](/Capturas/prop8.png)

![alt text](/Capturas/prop9.png)        ![alt text](/Capturas/prop10.png)

![alt text](/Capturas/prop11.png)        ![alt text](/Capturas/prop12.png)

![alt text](/Capturas/prop13.png)        ![alt text](/Capturas/prop14.png)


### Ejemplos de usabilidad:

En este apartado analizaremos los distintos apartados de la usabilidad de la aplicación, teniendo en cuenta aspectos como: su facilidad de aprender a usar, previsión de errores, retroalimentación, consistencia, simplicidad y seguridad.

* El diseño inicial de la página, es un diseño sencillo y simple, sin dar tanta información al usuario y saturarlo con tanta información, con una disposición de elementos muy familiar para el usuario :

![alt text](/Capturas/usa1.png)

* El diseño de la página es sólido y homogéneo, no hay ningúna interfaz que desencaje en cuanto al contexto de la propia app: 


![alt text](/Capturas/usa4.png)

![alt text](/Capturas/usa5.png)

![alt text](/Capturas/usa6.png)

Como se puede observar en estas tres interfaces de ejemplo los colores y formas utilizadas no desencajan o dan un mal gusto visual.

* Las distintas acciones como eliminar o editar están definidas por un color distintivo en el caso de las cuentas de usuarios y videojuegos (La última imagen pertenece a la vista de administrador):

![alt text](/Capturas/usa7.png) ![alt text](/Capturas/usa8.png)

* A la hora de eliminar un elemento importante se le comunica al usuario si está seguro de realizar dicha acción:

![alt text](/Capturas/usa9.png)

* En todos los formularios se le indica al usuario qué tipo de datos debe de introducir y en caso de ser erróneos también será notificado:

![alt text](/Capturas/usa10.png)

* A la hora de un usuario crear una cuenta se le avisará de cuando su cuenta ha sido registrada correctamente:

![alt text](/Capturas/usa11.png)

* Cuando el usuario trate de introducir un valor que ya existe se le notificará de que dicho dato ya existe previamente:

![alt text](/Capturas/usa12.png)


![alt text](/Capturas/usa13.png)

* El menú lateral tiene varias opciones para ser invocado y para cerrarse:

Para abrirse puede ser invocado clickando en el icono del menú o bien puede ser invocado deslizando el dedo de izquierda a derecha:

![alt text](/Capturas/usa2.png)

Para ser cerrado el usuario puede pulsar fuera del menú, pulsar el botón de cerrar o deslizar de derecha a izquierda:


![alt text](/Capturas/usa3.png)

* Los iconos del menú dan una descripción visual de que hará cada uno y el usuario puede intuir cual es la función de cada uno:

![alt text](/Capturas/usa14.png)

* La contraseña de los usuarios es privada, ni siquiera el propio administrador puede saber cual es:

![alt text](/Capturas/usa15.png)

Como se puede observar en la imagen anterior la contraseña es un misterio además de que aunque no se visualice la contraseña está encriptada en todo momento.

* Para informar al usuario de que al realizar una búsqueda está aún no ha finalizado se le muestra un gif para que la espera sea más amena, además de dejar claro que aún no ha finalizado de realizarse:

![alt text](/Capturas/usa16.png)

* Para dar un gusto al usuario, el usuario puede modificar su propia foto de perfil:

![alt text](/Capturas/usa17.png)

* Al inicio de la página el usuario puede decidir si recibir una pequeña introducción de las opciones de las que dispone:

![alt text](/Capturas/usa18.png)


## Manual de instalación

### Instalación en el servidor sin graphql y vaadin:

1. Antes que nada es necesario tener instalado en el servidor SQL Server express de 2017 y SQL Server Management, la instalación y configuración de dichas tecnologías no serán explicadas en este manual. El servicio de SQL Server usará el puerto 1433.

2. En nuestro gestor de SQL Server ejecutaremos el script “.sql” que se encontrará en la carpeta llamada “database” para crear la base de datos que utilizará la aplicación.

3. Una vez se haya creado la base de datos procederemos a iniciar el backend, en este ejemplo se usará el IDE Eclipse (es necesario tener el plugin de spring boot instalado). 

4. En Eclipse creamos un workspace ( File -> Switch workspace -> Other ) y seleccionamos la ruta donde está la carpeta “Backend”.

5. Una vez hecho lo anterior añadiremos los archivos al proyecto, de esta manera ( File -> open project from file system ) y en import source seleccionas el directorio “Backend”. 

6. Una vez seleccionado le das a "Finish" y podrás usar el backend en eclipse dándole a click derecho al proyecto y "run as Spring boot App".


Una vez hayamos hecho todo lo anterior el backend funcionará correctamente, pero cabe aclarar que en application.properties tendremos que poner el nombre de usuario y contraseña de nuestra base de datos SQL Server. 

Además en este mismo archivo podremos modificar el puerto que usa la base de datos en caso de querer usar otros puertos.

Aclaración: Nuestro backend usará el puerto 8080.


### Instalación en el servidor con graphql y vaadin:

1. Los archivos necesarios para usar graphql y vaadin se encuentran en el siguiente repositorio: https://github.com/christianAlexMoreVer/Proyecto-Duo-SGV. 

2. Hay que realizar lo mismo que en los puntos anteriores con la diferencia de que este tendrá que usar un workspace distinto, y que la carpeta project es la que hay que importar al workspace, además de que este proyecto usará el puerto 8013. Aunque también este proyecto puede ser abierto y usado en IntelliJ IDEA. 

3. Al iniciar la aplicación accediendo a localhost:8013 podrás empezar a usar vaadin.


Aclaración extra: La aplicación está pensada para solo tener un administrador pero en caso de que se quiera añadir otro usuario con permisos se tendrá que modificar el código y asignar el rol como 1 al usuario que se vaya a crear.


### Instalación en el cliente sin vaadin:

1. En este caso el cliente usará Node.js, Ionic y Angular, como se mencionó en el primer punto del anterior apartado, en esta guía no se explicará la instalación de dichas tecnologías.  

2. Usaremos Visual Studio Code para poder ejecutar el frontend, así que abriremos la carpeta “Frontend” con Visual Studio.

3. Una vez hecho lo anterior abriremos una terminal desde visual studio y ejecutaremos el siguiente comando sin comillas:

“npm install” 

4. Después de realizar el paso anterior ejecutaremos el siguiente comando:

“ionic serve” 

5. Con el paso anterior nuestro frontend comenzará a funcionar, aunque para que funcione correctamente previamente el backend debe de estar funcionando.


Aclaración: El frontend usará el puerto 8100.

Credenciales del usuario administrador:

* email: admin@huntthegame.com
* password: 12345678

### Instalación del sistema de ayuda:

1. Necesitamos instalar HelpDocs:

https://www.helpndoc.com/

2. Una vez instalado, en la carpeta llamada HelpDocs encontraremos un archivo que abriremos con el programa mencionado anteiormente.

3. Al abrir el archivo seleccionamos generar ayuda > documentación html.

![alt text](/Capturas/help1.png)

4. Luego hay que hacer click en "iniciando servidor" y en la ventana emergente que saldrá, en el campo "puerto" ponemos el puerto 8081 e iniciamos el servidor.

![alt text](/Capturas/help2.png)

5.Ya nuestra ayuda será accecible desde el cliente:

![alt text](/Capturas/help3.png)


#### Tanto cliente como servidor deben de estar corriendo en el mismo dispositivo porque por ahora solo funciona de forma local.

## Pila tecnológica

* Ionic: 5.4.16 --> https://ionicframework.com/
* SQL Server Express 2017 --> https://www.microsoft.com/en-us/download/details.aspx?id=55994
* SQL Server Management --> https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15
* Angular CLI: 12.2.10 --> https://angular.io/cli
* Node: 14.18.1 --> https://nodejs.org/es/
* Package Manager: npm 8.1.0 
* Java Spring Boot: 2.5.6 --> https://spring.io/projects/spring-boot
* Java: 11 --> https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html
* Visual Studio Code --> https://code.visualstudio.com/
* Eclipse IDE --> https://www.eclipse.org/ide/
* Vaadin 14 --> https://vaadin.com/start
* Graphql --> https://graphql.org/
* IntelliJ IDEA --> https://www.jetbrains.com/idea/

## Comparación de tecnologías

Este proyecto ha sido desarrollado para convertirse en una aplicación híbrida, es decir el código de la aplicación se ejecuta sobre una vista de navegador permitiendo que se pueda adaptar a cada dispositivo de manera automática.

Esto no hubiese sido posible con un desarrollo enfocado en una aplicación nativa, además de que se hubiese tardado mucho más en poder desarrollarse. 

Por eso la tecnología usada en el frontend ha sido ionic, vaadin y angular, dichas tecnologías permiten el desarrollo de una aplicación híbrida capaz de ejecutarse en dispositivos móviles como en dispositivos de sobremesa.

Aunque otra opción hubiese sido desarrollarla como una aplicación web ya que igualmente se podría haber ejecutado en cualquier dispositivo con un navegador e internet.

## Planificación

Para la realización de este proyecto me he organizado en base a las semanas de las que disponía para tenerlo listo para su entrega.

* Primera semana : He creado el repositorio del proyecto y añadido sus carpetas correspondientes.

* Segunda semana: He creado el diagrama de los casos de uso que la aplicación, terminado de crear el prototipo y empezado a construir el backend.

* Tercera y cuarta semana: Me he dedicado a hacer un backend funcional y a realizar los diagramas de la base de datos.

* Quinta y sexta semana: Me he dedicado a crear el frontend y corregir bugs que me fueran ocurriendo.

* Los días restantes me he centrado en pulir la aplicación y en realizar la documentación del proyecto. 

Durante el proyecto he llevado el proyecto en dos ramas de git distintas “main” y “development”.

Para la segunda parte del proyecto nos hemos cordinado usando la pestaña de projects la cual se puede consultar en el otro repositorio del proyecto.

https://github.com/christianAlexMoreVer/Proyecto-Duo-SGV

## Conclusión

Como conclusión he de decir que el resultado nos ha gustado para ser la primera aplicación que realizamos más en profundidad con las tecnologías ya mencionadas.

Al ir encontrandonos con distintos problemas hemos aprendido varias cosas que no sabiamos de antemano y que a la hora de reencontrarnos con un mismo problema ya sabremos cómo solucionarlo con más rapidez, porque encontrarnos con estas barreras han sido lo que ha hecho que tardemos en el proceso de realización.

Siendo crítico con nuestro propio proyecto sabemos que hay muchos aspectos que se pueden mejorar o realizar de forma más eficiente, somos consciente de ello, aunque sí es cierto que dichas formas no las conocemos o no se nos han pasado por la mente a la hora del desarrollo.
