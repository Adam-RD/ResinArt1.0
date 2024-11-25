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

        [HttpGet]
        public ActionResult<IEnumerable<PedidoPendiente>> GetPedidosPendientes()
        {
            return Ok(_repository.GetAll());
        }

        [HttpPost]
        public ActionResult<PedidoPendiente> AddPedidoPendiente(PedidoPendiente pedido)
        {
            _repository.Add(pedido);
            return CreatedAtAction(nameof(GetPedidosPendientes), new { id = pedido.Id }, pedido);
        }

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

        [HttpGet("total-precio-completados")]
        public ActionResult<decimal> GetTotalPrecioCompletados()
        {
            var total = _repository.GetTotalPrecioCompletados();
            return Ok(total);
        }

    }
}
