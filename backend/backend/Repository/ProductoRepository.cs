using DB;
using DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class ProductoRepository : IRepository<Producto>
    {
        private readonly PosContext _context;
        public ProductoRepository(PosContext context)
        {
            _context = context;
        }

        public async Task<Producto> Create(Producto entity)
        {
            _context.Productos.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Producto> Delete(int id)
        {
            Producto producto = await _context.Productos.FindAsync(id);
            if (producto != null)
            { 
                _context.Productos.Remove(producto);
                await _context.SaveChangesAsync();
                return producto;
            }
            return null;
        }

        public async Task<List<Producto>> GetAll()
        {
            return await _context.Productos.ToListAsync();
        }

        public async Task<Producto> GetById(int id)
        {
            return await _context.Productos.FindAsync(id);
        }

        public async Task<Producto> Update(Producto entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return entity;
        }

    }
}
