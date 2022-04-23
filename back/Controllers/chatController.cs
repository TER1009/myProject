using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using back.DTO;
using back.services;
using System.Text.Json;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Linq;

namespace back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class chatController : ControllerBase
    {
        roomDTOService service = new roomDTOService();
        userDTOService userService = new userDTOService();

        [HttpPost(nameof(roomCreate))]
        public async Task<IActionResult> roomCreate([FromBody] roomView room)
        {
            try
            {
                var id = "";
                var cookie = Request.Cookies["id"];
                var refresh = Request.Cookies["refresh"];
                var jwt = new JwtSecurityTokenHandler();
                if (cookie != null)
                {
                    id = jwt.ReadJwtToken(cookie).Claims.First(x => x.Type == "id").Value;
                }
                else
                {
                    var email = jwt.ReadJwtToken(cookie).Claims.First(x => x.Type == "email").Value;
                    id = userService.getByEmailReturnPersonalDataClientDto(email).id.ToString();
                }
                if (cookie != null || refresh != null)
                {
                    var roomNew = new roomDTO()
                    {
                        id = Guid.NewGuid(),
                        ownerUserid = new Guid(id),
                        topic = room.topic
                    };
                    //service.create(roomNew);
                    return Ok("true " + roomNew);
                }
                else return BadRequest("false");
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet(nameof(roomGet))]
        public async Task<IActionResult> roomGet()
        {

            return Ok();
        }
    }
}