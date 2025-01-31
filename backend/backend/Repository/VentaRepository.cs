using DB;
using DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class VentaRepository : IRepository<Venta>
    {
        private readonly PosContext _context;
        public VentaRepository(PosContext context)
        {
            _context = context;
        }

        public async Task<Venta> Create(Venta entity)
        {
            _context.Ventas.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Venta> Delete(int id)
        {
            Venta venta = await _context.Ventas.FindAsync(id);
            if (venta != null)
            { 
                _context.Ventas.Remove(venta);
                await _context.SaveChangesAsync();
                return venta;
            }
            return null;
        }

        public async Task<List<Venta>> GetAll()
        {
            return await _context.Ventas.ToListAsync();
        }

        public async Task<Venta> GetById(int id)
        {
            return await _context.Ventas.FindAsync(id);
        }

        public async Task<Venta> Update(Venta entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return entity;
        }

    }
}
