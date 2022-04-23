using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using back.services;
using System;
using Microsoft.AspNetCore.Http;
using back.DTO;
using back.repository;
using System.Threading.Tasks;

namespace back.Controllers
{
    //[Route("api/login")]
    [Route("api/[controller]")]
    [ApiController]
    public class log : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly userService _service;
        private readonly HttpContext _context;
        private readonly userRepository repository = new userRepository();
        private readonly userDTOService dto = new userDTOService();
        public log(IConfiguration configuration, userService service)
        {
            _configuration = configuration;
            _service = service;
        }

        // [AllowAnonymous]
        // [HttpPost(nameof(register))]
        //[HttpPost]
        // public async Task<IActionResult> register([FromBody] clientDTO userDto)
        // {
        //     // var claims = new List<Claim>
        //     // {
        //     //     new Claim(ClaimTypes.Name, "name")
        //     // };
        //     // var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        //     // var principal = new ClaimsPrincipal(identity);
        //     // var props = new AuthenticationProperties();
        //     // HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, props).Wait();
        //     var cookie = Request.Cookies["userid"];
        //     if (cookie == null)
        //     {
        //         HttpContext.Response.Cookies.Append("userId", generateJwtToken(new ClaimsIdentity(new[] {
        //      new Claim("id", "123".ToString()),
        //        })).ToString(),
        //            new CookieOptions
        //            {
        //                Expires = DateTime.Now.AddSeconds(10),
        //                MaxAge = TimeSpan.FromSeconds(10),
        //                Secure = true
        //            });
        //         return Ok("create");
        //     }
        //     else return Ok("not null");
        // }

        [AllowAnonymous]
        [HttpPost(nameof(register))]
        //[HttpPost]
        public async Task<IActionResult> register([FromBody] clientDTO userDto)
        {
            bool isValid = _service.isValidDataUser(userDto);
            Console.WriteLine("..........................");
            var message = check(userDto);

            if (message == null)
            {
                clientPersonalDataDTO dataDTO = new clientPersonalDataDTO();
                dataDTO.id = Guid.NewGuid();
                dataDTO.token = generateJwtToken(new ClaimsIdentity(new[] { new Claim("id", dataDTO.id.ToString()), })).ToString();
                dataDTO.tokenRefresh = generateJwtToken(new ClaimsIdentity(new[] { new Claim("email", userDto.email) })).ToString();
                dataDTO.role = "user";
                dto.create(userDto, dataDTO);
                return Ok("true");
            }
            else return BadRequest(message);
        }

        private string check(clientDTO p)
        {
            var listDto = dto.returnListDTO();
            var message = "";
            if (listDto.Count > 0)
                foreach (var item in listDto)
                {
                    if (string.Equals(item.nickname, p.nickname) && string.Equals(item.email, p.email)) return "Аккаунт уже существует";

                    if (!string.Equals(item.nickname, p.nickname) && !string.Equals(item.email, p.email)) message = null;

                    if (string.Equals(item.nickname, p.nickname) && !string.Equals(item.email, p.email)) return "Имя занято";

                    if (!string.Equals(item.nickname, p.nickname) && string.Equals(item.email, p.email)) return "Такой email уже использовался";
                }
            else return null;
            return message;
        }

        [AllowAnonymous]
        [HttpPost(nameof(logIn))]
        //[HttpPost]
        public IActionResult logIn([FromBody] clientDTO userDto)
        {
            var cookie = Request.Cookies["id"];
            var refresh = Request.Cookies["refresh"];
            var checkUser = dto.checkUser(userDto);
            if (checkUser != null)
            {
                Console.WriteLine("???????");
                HttpContext.Response.Cookies.Append("id", checkUser.token,
                           new CookieOptions
                           {
                               Expires = DateTime.Now.AddMinutes(5),
                           });
                HttpContext.Response.Cookies.Append("refresh", checkUser.tokenRefresh,
                    new CookieOptions
                    {
                        Expires = DateTime.Now.AddDays(1)
                    });
                var user = dto.getByID(checkUser.id);
                return Ok("true " + user.nickname);
            }
            else return BadRequest("false/ Неправильный логин или пароль");//"please.register"
        }

        [AllowAnonymous]
        [HttpGet(nameof(checkLogIn))]
        //[HttpPost]
        public async Task<IActionResult> checkLogIn()
        {
            var Jwt = new JwtSecurityTokenHandler();
            var cookie = Request.Cookies["id"];
            var refresh = Request.Cookies["refresh"];
            var list = dto.getALLClientDTO();
            if (list != null)
            {
                if (cookie != null && refresh != null)
                {
                    var data = Jwt.ReadJwtToken(refresh);
                    var email = data.Claims.First(claim => claim.Type == "email").Value;
                    var user = dto.getByEmailReturnClientDto(email);
                    Console.WriteLine("user " + user.email);
                    if (user != null) return Ok("true " + user.nickname);
                }
                else
                if (cookie == null && refresh != null)
                {
                    var data = Jwt.ReadJwtToken(refresh).Claims.First(claim => claim.Type == "email");
                    var user = dto.getByEmailReturnPersonalDataClientDto(data.Value);
                    Console.WriteLine("checkLogin " + user.token);
                    HttpContext.Response.Cookies.Append("id", user.token,
                    new CookieOptions
                    {
                        Expires = DateTime.Now.AddMinutes(5),
                    });
                    var userName = dto.getByID(user.id).nickname;
                    return Ok("true " + userName);
                }
                else
                if (cookie == null && refresh == null) return BadRequest("false Войдите в аккаунт");
            }
            else return BadRequest("Зарегестрируйтесь");
            return BadRequest();
        }

        [HttpGet(nameof(logOut))]
        //[HttpPost]
        public async Task<IActionResult> logOut()
        {
            var cookie = HttpContext.Request.Cookies["id"];
            if (cookie != null)
            {
                HttpContext.Response.Cookies.Delete("id");
                HttpContext.Response.Cookies.Delete("refresh");
                return Ok("true");
            }
            else return BadRequest("please logIn or register");
        }

        private string generateJwtToken(ClaimsIdentity claims)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}