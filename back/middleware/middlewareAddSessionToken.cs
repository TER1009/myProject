using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace back.middleware
{
    public class middlewareAddSessionToken
    {
        private readonly RequestDelegate _next;
        HttpContext _context;

        public middlewareAddSessionToken(RequestDelegate next, HttpContext context){
            _next = next;
            _context = context;
        }

        public async Task genTokenSession(){
            var token = _context.Request.Cookies[".aspNetCore.Session"];
            if(!string.IsNullOrEmpty(token)){
                _context.Request.Headers.Add("Authorization","Beaber" + token);
            }
            await _next(_context);
        }
    }
}