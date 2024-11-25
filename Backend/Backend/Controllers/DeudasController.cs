using Backend.Models;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class DeudasController : ControllerBase
    {
        private readonly IDeudaRepository _deudaRepository;

        public DeudasController(IDeudaRepository deudaRepository)
        {
            _deudaRepository = deudaRepository;
        }

        // GET: api/deudas
        [HttpGet]
        public ActionResult<IEnumerable<Deuda>> GetDeudas()
        {
            var deudas = _deudaRepository.GetAll();
            return Ok(deudas);
        }

        // GET: api/deudas/{id}
        [HttpGet("{id}")]
        public ActionResult<Deuda> GetDeudaById(int id)
        {
            var deuda = _deudaRepository.GetById(id);
            if (deuda == null)
            {
                return NotFound();
            }
            return Ok(deuda);
        }

        // POST: api/deudas
        [HttpPost]
        public ActionResult<Deuda> AddDeuda(Deuda deuda)
        {
            _deudaRepository.Add(deuda);
            return CreatedAtAction(nameof(GetDeudaById), new { id = deuda.Id }, deuda);
        }

        // PUT: api/deudas/{id}/aporte
        [HttpPut("{id}/aporte")]
        public ActionResult UpdateAporte(int id, [FromBody] decimal aporte)
        {
            var deuda = _deudaRepository.GetById(id);
            if (deuda == null)
            {
                return NotFound();
            }

            _deudaRepository.UpdateAporte(id, aporte);
            return NoContent();
        }
    }
}
