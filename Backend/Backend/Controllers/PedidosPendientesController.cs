using Backend.Models;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidosPendientesController : ControllerBase
    {
        private readonly IPedidoPendienteRepository _repository;

        public PedidosPendientesController(IPedidoPendienteRepository repository)
        {
            _repository = repository;
        }

        // Obtener todos los pedidos pendientes
        [HttpGet]
        public ActionResult<IEnumerable<PedidoPendiente>> GetPedidosPendientes()
        {
            return Ok(_repository.GetAll());
        }

        // Agregar un nuevo pedido pendiente
        [HttpPost]
        public ActionResult<PedidoPendiente> AddPedidoPendiente(PedidoPendiente pedido)
        {
            // Asegurarse de que los campos necesarios sean proporcionados
            if (pedido.Cantidad <= 0 || pedido.PrecioPorUnidad <= 0)
            {
                return BadRequest("La cantidad y el precio por unidad deben ser mayores a cero.");
            }

            // Agregar el pedido al repositorio
            _repository.Add(pedido);

            // Devolver una respuesta con el nuevo pedido creado
            return CreatedAtAction(nameof(GetPedidosPendientes), new { id = pedido.Id }, pedido);
        }

        // Eliminar un pedido pendiente por ID
        [HttpDelete("{id}")]
        public ActionResult DeletePedido(int id)
        {
            var pedido = _repository.GetById(id);
            if (pedido == null)
            {
                return NotFound();
            }

            _repository.Delete(id);
            return NoContent();
        }

        // Marcar un pedido como completado
        [HttpPut("{id}/completar")]
        public ActionResult CompletePedido(int id)
        {
            var pedido = _repository.GetById(id);
            if (pedido == null)
            {
                return NotFound();
            }

            _repository.Complete(id);
            return NoContent();
        }

        // Obtener el total de precios de los pedidos completados
        [HttpGet("total-precio-completados")]
        public ActionResult<decimal> GetTotalPrecioCompletados()
        {
            var total = _repository.GetTotalPrecioCompletados();
            return Ok(total);
        }
    }
}
