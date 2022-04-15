using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using back.services;
using back.DTO;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;


namespace back.Controllers
{

    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class pages : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly userService _service;
        private charactersDTOService dto = new charactersDTOService();
        private userDTOService userDto = new userDTOService();
        public pages(IConfiguration configuration, userService service)
        {
            _configuration = configuration;
            _service = service;
        }

        [HttpPost(nameof(postPage))]
        public async Task<IActionResult> postPage([FromBody] charactersDTO character)
        {
            if (pagesValidService.check(character))
            {
                var list = dto.getAll();
                if (list == null) character.id = Guid.NewGuid();
                else character.id = Guid.NewGuid();
                var cookie = Request.Cookies["id"];
                if (cookie == null)
                {
                    var refresh = Request.Cookies["refresh"];
                    var Jwt = new JwtSecurityTokenHandler();
                    var data = Jwt.ReadJwtToken(refresh).Claims.First(claim => claim.Type == "email");
                    var user = userDto.getByEmailReturnPersonalDataClientDto(data.Value);
                    character.ownerClientId = user.id;
                    character.lastEditor = user.id;
                }
                else
                {
                    var Jwt = new JwtSecurityTokenHandler();
                    var data = Jwt.ReadJwtToken(cookie).Claims.First(claim => claim.Type == "id");
                    var user = userDto.getByIDPersonalDataDTO(new Guid(data.Value));
                    character.ownerClientId = user.id;
                    character.lastEditor = user.id;
                }
                //dto.create(character);
                return Ok("true");
            }
            else return BadRequest("Не все поля заполнены");
        }
    }
}