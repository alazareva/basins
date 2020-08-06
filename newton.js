function newton(z, f, f_prime, max_iter, tolerance) {
    for (i = 0; i < max_iter; i++) {
        let step = math.divide(f(z), f_prime(z));
        if (math.abs(step) < tolerance) {
            return [i, z]
        }
        z = math.subtract(z, step);
    }
    return [i, z]
}
