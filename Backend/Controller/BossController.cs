using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Model;
using Backend.Data;

namespace Backend.Controller
{
    [ApiController]
    [Route("controller")]
    public class BossController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public BossController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        
    [HttpPost]
    public async Task<IActionResult> AddBoss([FromBody] Boss boss)
    {
        if (boss == null)
        {
            return BadRequest("Boss invalido");
        }

        try 
        {
            await _appDbContext.tb_bosses.AddAsync(boss);
            await _appDbContext.SaveChangesAsync();
            return Created("Boss criado com sucesso", boss);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Boss>>> GetBosses()
    {
        try
        {
            var bosses = await _appDbContext.tb_bosses.ToListAsync();
            if (bosses == null || !bosses.Any())
            {
                return NotFound("Nenhum boss encontrado");
            }
            return Ok(bosses);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Boss>> GetBossById(int id)
    {
        try
        {
            var boss = await _appDbContext.tb_bosses.FindAsync(id);
            if (boss == null)
            {
                return NotFound("Boss não encontrado");
            }
            return Ok(boss);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBoss(int id, [FromBody] Boss boss)
    {
        if (id != boss.Id)
        {
            return BadRequest("ID do boss não corresponde");
        }

        try
        {
            _appDbContext.tb_bosses.Update(boss);
            await _appDbContext.SaveChangesAsync();
            return Ok("Boss atualizado com sucesso");
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBoss(int id)
    {
        try
        {
            var boss = await _appDbContext.tb_bosses.FindAsync(id);
            if (boss == null)
            {
                return NotFound("Boss não encontrado");
            }

            _appDbContext.tb_bosses.Remove(boss);
            await _appDbContext.SaveChangesAsync();
            return Ok("Boss deletado com sucesso");
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }
}
}