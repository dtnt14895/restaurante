using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DB.Models
{
    public class DetalleVenta
    {
        public int DetalleVentaId { get; set; }
        public int VentaId { get; set; }
        public int ProductoId { get; set; }
        public int Cantidad{ get; set; }
        public decimal Subtotal { get; set; }
        //relaciones
        public virtual Producto ?Producto { get; set; }
        [JsonIgnore]
        public virtual Venta ?Venta { get; set; }


    }
}
