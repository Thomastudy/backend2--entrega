class CartManager{
    constructor(path){

    }

    async cargarCarritos() {
             
        try {
            const data = await fs.readFile(this.path, "utf-8")
            this.carts = JSON.parse(data)
            if(this.cargarCarritos.length >0){

            }
        }
    }

    async guardarCarritos(){
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2))
    }

    // metodo para crear carrito

    async crearCarrito(){
        const nuevoCarrito = {
            id: ++this.ultId,
            produts: []
        }

        // con este metodo metemos al array
        this.carts.push(nuevoCarrito)
    }

}